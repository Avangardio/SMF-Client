import styles from '../Styles/Account.module.sass'
import {useState} from "react";
import AccountList from "./AccountList";
//Функция-компонент, ответственная за отображение аккаунта
export default function Account({email, nickname}: { email: string, nickname: string }) {
    //Стейт для окошка
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                className={`${styles.AccountIcon} ${styles['Color-' + parseInt(String(Math.random() * 10))]}`}>{nickname[0]}</div>
            <span className={styles.AccountOption}>{`Hello, ${nickname}`}</span>
            <a className={`${styles.AccountButton} ${open ? styles.Active : ''}`}
               onClick={() => setOpen(!open)}>{">"}</a>
            <AccountList status={open}/>
        </>
    )
}