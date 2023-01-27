import React, {useState} from "react";
import styles from '../Overlays/Styles/NewUserOverlay.module.scss'
import ORTiltle from "./Components/ORTiltle";
import ExternalLogins from "./Components/ExternalLogins";
import LoginForm from "./Components/LoginForm";
import Suggestion from "./Components/Suggestions";
import Header from "./Components/Header";
import CodeConfirmation from "./Components/CodeConfirmation";
import {useSelector} from "react-redux";
import {authSelector} from "../Redux/Reducers/authReducer";
import RegistrationForm from "./Components/RegistrationForm";
import Recovery from "./Components/Recovery";

type localSign = {
    password: string,
    email: string,
    nickname: string,
}

//Функция-компонент, отвечающая за аутентификацию
export default function Authentication() {
    //стейт для отображения логина или регистрации
    //login - для логина, registration - для начала регистрации, recovery - для восстановления пароля, confirmation - для подтверждения
    const [currentSign, setCurrentSign] = useState<Signs>('login');
    //Стейт для хранения информации
    const [loginForm, updateLoginForm] = useState<localSign>({password: '', email: '', nickname: ''});
    //вызываем стор для получения токена
    const token = useSelector(authSelector).token;

    //если сейчас идет этап подтверждения, выводим его окно
    if (currentSign === 'confirmation') {
        return (
            <div className={`${styles.CodeConfirmationContainer} ${styles.WithShadow}`}>
                <CodeConfirmation email={loginForm.email} nickname={loginForm.nickname} token={token}/>
            </div>
        )
    }
    ;
    //если сейчас идет этап восстановления пароя, выводим его окно
    if (currentSign === 'recovery') {
        return (
            <div className={`${styles.NewUserWindow} ${styles.WithShadow}`}>
                <Recovery state={currentSign} updateState={setCurrentSign}/>
            </div>
        )
    }
    ;
    //По дефолту выводим окошко логина
    return (
        <div data-testid={'Auth'} className={`${styles.NewUserWindow} ${styles.WithShadow}`}>    {/* Контейнер */}
            <Header status={currentSign}/> {/* Заголовок, меняющийся от статуса */}
            {/* Форма логина или регистрации, принимает стейт логина, стейт опции, и обновления логина и опции*/}
            {currentSign === 'login' ?
                <LoginForm state={currentSign}
                           updateState={setCurrentSign}
                           loginForm={loginForm}
                           updateLoginForm={updateLoginForm}
                />
                :
                <RegistrationForm state={currentSign}
                                  updateState={setCurrentSign}
                                  loginForm={loginForm}
                                  updateLoginForm={updateLoginForm}
                />
            }
            <ORTiltle/> {/* Плашка ИЛИ */}
            <ExternalLogins/> {/* Внешние логины */}
            <Suggestion stateChanger={setCurrentSign}
                        state={currentSign}/> {/* Элемент, ответственный за выбор формы, передаем туда стейт ченджер */}
        </div>
    );
}
