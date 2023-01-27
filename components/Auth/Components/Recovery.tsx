import React, {ReactNode, useEffect, useState} from "react";
import Header from "./Header";
import animateError from "../Functions/animateError";
import {emailRegex, passwordRegex} from "../Functions/validationRegex";
import styles from "../Styles/InternalLogins.module.sass";
import axios from "axios";
import ErrorNotify from "./ErrorNotify";
import {authLink} from "../../../LINKS";

interface formData {
    email: string,
    password: string,
    rePassword: string,
    code: string
}

interface currentState {
    state: string
    updateState: React.Dispatch<React.SetStateAction<Signs>>
}

//Функция компонент, ответсвенная за восстановление пароля, принимает стейт состояния и его изменения
export default function Recovery({state, updateState}: currentState) {
    //Стейт шагов восстановления, где 1 - вводим почту 2 - вводим код 3 - вводим новый пароль
    const [step, updateStep] = useState<1 | 2 | 3>(1);
    //стейт с данными для всех шагов
    const [formData, updateFormData] = useState<formData>({email: '', password: '', rePassword: '', code: ''})
    //стейт с сообщением ошибки
    const [error, setError] = useState<string>('');

    let output: ReactNode;

    //запускается при каждом изменения кода
    useEffect(() => {
        //проверяем, полный ли массив, если нет, возвращаемся.
        if (formData.code.length != 6) return;
        //Иначе, отправляем запрос
        if (step === 2) {
            //отправляем запрос для получения кода
            axios.get(`${authLink}/auth/requestToMailer_Recovery?email=${formData.email}&code=${formData.code}`)
                .then(
                    //колбек успеха, переходим на следующий степ
                    result => updateStep(3),
                    //иначе, пишем ошибку
                    error => {
                        //удаляем код
                        updateFormData({...formData, code: ''})
                        //обновляем ошибку
                        setError(error.response.data);
                        //Анимируем её
                        animateError();
                    }
                );
        }
        ;
    }, [formData.code]);

    //функция отвечающая за ошибки инпутов
    function handleInvalid(event: any): void {
        //отменяем дефолт
        event.preventDefault();
        event.target.name === 'email' ? setError('Email must be correct') : null;
        event.target.name === 'password' ? setError('Password must be:\n - At least 7 symbols.\n - At least one digit or letter') : null;
        //анимируем ашибку
        animateError();
    }

    //Функция-обработчик нажатия, предотвращает нажатия не на цифры
    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        //ищем совпадения
        return ['Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9'].includes(event.code);
    }

    //функция отвечающая за чендж инпутов
    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        //если есть ошибка, удаляет ее
        error ? setError('') : null;
        //обновляет данные в стейте
        updateFormData({...formData, [event.target.name]: event.target.value.trim()});
    }

    //Функция, отвечающая за возврат в форму логина
    function handleBack() {
        updateState('login');
    }

    //функция отвечающая за отправку формы
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (step === 1) {
            //проверяем почту
            if (!validateEmail()) {
                setError('Email incorrect');
                return animateError()
            }
            //отправляем запрос для получения кода
            axios.get(`${authLink}/auth/requestToMailer_Recovery?email=${formData.email}`)
                .then(
                    //колбек успеха, переходим на следующий степ
                    result => updateStep(2),
                    //иначе, пишем ошибку
                    error => {
                        setError(error.response.data);
                        //Анимируем её
                        animateError();
                    }
                );
        }
        ;
        if (step === 3) {
            //проверяем инпуты
            if (!validatePassword()) {
                setError('Password incorrect');
                return animateError()
            }
            //проверяем проли
            if (!validateEqualPasswords()) {
                setError('Passwords are not equal');
                return animateError()
            }
            //отправляем запрос для получения кода
            axios.get(`${authLink}/auth/requestToMailer_Recovery?email=${formData.email}&code=${formData.code}&password=${formData.password}&rePassword=${formData.rePassword}`)
                .then(
                    //колбек успеха, переходим на следующий степ
                    result => updateState('login'),
                    //иначе, пишем ошибку
                    error => {
                        setError(error.response.data);
                        //Анимируем её
                        animateError();
                    }
                );
        }
    }

    //проверка имейла
    function validateEmail(): boolean {
        return (new RegExp(emailRegex).test(formData['email']));
    }

    //проверка почты
    function validatePassword(): boolean {
        return (new RegExp(passwordRegex).test(formData['password']));
    }

    //сравнения новой почты и ее повторения
    function validateEqualPasswords(): boolean {
        return (formData.password === formData.rePassword);
    }

    //изменяем импуты в зависимости от степа
    if (step === 1) {
        output =
            <input name={'email'}
                   className={`${styles.EmailForm} ${styles.Recovery}`}
                   pattern={emailRegex}
                   onInvalid={handleInvalid}
                   value={formData.email}
                   onChange={handleChange}
                   placeholder={'Email'}
            />
    }
    ;
    if (step === 2) {
        output =
            <input disabled={formData.code.length === 6}
                   name={'code'}
                   className={styles.InputField}
                   placeholder={'Code'}
                   value={formData.code} maxLength={6}
                   onChange={handleChange}
                   onKeyDown={handleKeyDown}
            />
    }
    ;
    if (step === 3) {
        output =
            <>
                <input name={'password'}
                       className={`${styles.EmailForm}`}
                       value={formData.password}
                       onChange={handleChange}
                       placeholder={'New password'}
                />
                <input name={'rePassword'}
                       className={`${styles.EmailForm}`}
                       value={formData.rePassword}
                       onChange={handleChange}
                       placeholder={'Repeat password'}
                />
            </>
    }
    ;

    function checkInputs(): boolean {
        if (step === 1) return formData.email.length > 0;
        if (step === 2) return formData.code.length > 0;
        if (step === 3) return (formData.password.length > 0 && formData.rePassword.length > 0);
        return false;
    }

    return (
        <>
            <Header status={'recovery'}/>
            <form className={styles.InternalForm} onSubmit={handleSubmit}>
                {output}
                {
                    step !== 2 ?
                        <input
                            className={`${!checkInputs() ? styles.Disabled : ''} ${styles.FormButton} ${styles.WithShadow}`}
                            disabled={!checkInputs()}
                            name={'submit'}
                            type={'submit'}
                            value={'Submit'}
                        />
                        :
                        null
                }
                <ErrorNotify message={error}/>
            </form>
            <a className={styles.Suggestion} onClick={handleBack}>Return to login?</a>
        </>
    )
}