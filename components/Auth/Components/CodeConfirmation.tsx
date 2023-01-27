import React, {useEffect, useState} from "react";
import styles from "../Styles/CodeConfirmation.module.sass";
import axios from "axios";
import animateError from "../Functions/animateError";
import ErrorNotify from "./ErrorNotify";
import {authLink} from "../../../LINKS";

//Окно подтверждения кода
export default function CodeConfirmation({email, nickname, token}: { email: string, nickname: string, token: string }) {
    //Стейт для хранения "чисел" в строках, в начале пустой массив.
    const [code, updateCode] = useState<string>('');
    //Создаем стейт для хранения ошибки
    const [error, setError] = useState<string>('');
    //Запускается при каждом изменении массива
    useEffect(() => {
        //проверяем, полный ли массив, если нет, возвращаемся.
        if (code.length != 6) return;
        //Иначе, отправляем запрос

        axios.get(`${authLink}/auth/requestToMailer_doneConfirmation?token=${token}&email=${email}&nickname=${nickname}&code=${code}`, {withCredentials: true})
            .then(
                //Колбек успеха
                result => typeof window !== 'undefined' ? window.location.reload() : null,
                //Колбек ошибки
                error => {
                    //Пишем ошибку
                    setError(error.response.data);
                    //Анимируем её
                    animateError();
                    //Обнуляем инпут
                    updateCode('');
                }
            )
    }, [code])

    //Функция-обработчик измения полей
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        //Обновляем определеный элемент массива
        updateCode(event.target.value)
    }

    //Функция, отвечающая за отправку нового кода
    function handleNewCode() {
        axios.get(`${authLink}/auth/requestToMailer_newCode?email=${email}&token=${token}`)
            .catch(error => console.log(error));
    }


    //Функция-обработчик нажатия, предотвращает нажатия не на цифры
    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        //ищем совпадения
        console.log(event.code)
        return ['Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9'].indexOf(event.code) === 0;
    }

    return (
        <>                                                                               {/* Контейнер */}
            <div className={styles.LoginHeader}><b>{`Insert code\nto confirm`}</b></div>
            {/* Заголовок */}
            {/* инпут, дизейблится если длина равна 6 символам */}
            <input disabled={code.length === 6}
                   className={styles.InputField}
                   value={code} maxLength={6}
                   placeholder={'Code'}
                   onChange={handleChange}
                   onKeyDown={handleKeyDown}
            />
            <ErrorNotify message={error}/>
            <a className={styles.Suggestion} onClick={handleNewCode}>Need new code?</a>
        </>
    )
}