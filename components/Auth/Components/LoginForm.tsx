import React, {useState} from "react";
import styles from "../Styles/InternalLogins.module.sass";
import ErrorNotify from "./ErrorNotify";
import axios from "axios";
import {useSelector} from "react-redux";
import {authSelector} from "../../Redux/Reducers/authReducer";
import animateError from "../Functions/animateError";
import {emailRegex, passwordRegex} from "../Functions/validationRegex";
import {useRouter} from "next/router";
import {authLink} from "../../../LINKS";

type localSign = {
    password: string,
    email: string,
    nickname: string,
}

interface currentState {
    state: string
    updateState: React.Dispatch<React.SetStateAction<Signs>>
    loginForm: localSign
    updateLoginForm: React.Dispatch<React.SetStateAction<localSign>>
}


export default function LoginForm({state, updateState, loginForm, updateLoginForm}: currentState) {
    const [error, setError] = useState<string>('');
    const authToken = useSelector(authSelector).token;
    const router = useRouter();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        error ? setError('') : null;
        updateLoginForm({...loginForm, [event.target.name]: event.target.value.trim()});
    }

    //функция отвечающая за отправку формы
    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        //обязательно проверяем поля имейла и пароля
        if ((validateEmail() || validatePassword()) && !checkInputs()) {
            //если проблемы, возвращаем ошибку и выходим из функции.
            setError('Check All Fields.');
            //Анимируем ошибку
            return animateError();
        }
        //Отправляем запрос на логин
        axios.get(`${authLink}/auth/login?token=${authToken}&email=${loginForm.email}&password=${loginForm.password}`, {
            withCredentials: true
        })
            //ждем колбека
            .then(
                //на успехе делаем перезагрузку страницы
                result => router.reload(),
                //на ошибке выводим ошибку
                error => {
                    //обновляем ошибку
                    setError(error.response.data);
                    //анимируем её
                    animateError();
                }
            );
    }

    function checkInputs(): boolean {
        return (loginForm.email.length > 0) && (loginForm.password.length > 0);
    }

    function validateEmail(): boolean {
        return (new RegExp(emailRegex).test(loginForm['email'])
            || loginForm['email'].length < 1);
    }

    function validatePassword(): boolean {
        return (new RegExp(passwordRegex).test(loginForm['password'])
            || loginForm['password'].length < 1);
    }

    function handleInvalid(event: any): void {
        event.preventDefault();

        event.target.name === 'email' ? setError('Email must be correct') : null;
        event.target.name === 'password' ? setError('Password must be:\n - At least 7 symbols.\n - At least one digit or letter') : null;

        animateError();
    }

    return (
        <>
            <form className={styles.InternalForm} onSubmit={handleSubmit}>
                <input pattern={emailRegex}
                       className={`${styles.EmailForm} ${!validateEmail() ? `${styles.Error}` : ''}`}
                       name={'email'}
                       placeholder={'Email'}
                       value={loginForm.email}
                       onChange={handleChange}
                       onInvalid={handleInvalid}

                />
                <input className={`${styles.PasswordForm} ${!validatePassword() ? `${styles.Error}` : ''}`}
                       pattern={passwordRegex}
                       name={'password'}
                       placeholder={'Password'}
                       value={loginForm.password}
                       onChange={handleChange}
                       onInvalid={handleInvalid}

                />
                <a className={styles.ForgotPassword} onClick={() => updateState('recovery')}>Forgot Password?</a>

                <ErrorNotify message={error}/>

                <input disabled={!checkInputs()}
                       className={`${!checkInputs() ? styles.Disabled : ''} ${styles.FormButton} ${styles.WithShadow}`}
                       name={'submit'}
                       type={'submit'}
                       value={'Submit'}
                />
            </form>
        </>
    )
}