import styles from '../Styles/AccountList.module.sass'
import axios from "axios";
import {authLink} from "../../../LINKS";
//Функция-компонент, ответсвтвенная за отображение списка опций
export default function AccountList({status}: { status: boolean }) {
    //Функция для обработки логаута
    function handleLogout() {
        //Отправляем запрос
        axios.get(`${authLink}/auth/logout`, {withCredentials: true})
            .then(
                //перезагружаем страницу
                result => window.location.reload(),
                error => error
            )
    }

    return (
        <ul className={`${styles.AccountListUl} ${status ? styles.Visible : ''}`}>
            <li onClick={handleLogout}>Logout</li>
        </ul>
    )
}