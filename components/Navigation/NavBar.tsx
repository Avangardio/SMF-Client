import styles from './Styles/NavBar.module.scss'
import React from "react"
import {useRouter} from 'next/router';
import {useSelector} from "react-redux";
import {authSelector} from "../Redux/Reducers/authReducer";
import Image from "next/image";
import dynamic from "next/dynamic";

const Account = dynamic(() => import('./Components/Account'), {ssr: false});
//Функция-компонент Навигации
export default function NavBar() {
    //Создаем роутер
    const router = useRouter();
    //Получаем информацию об аккаунте
    const account = useSelector(authSelector).account;

    //Функция, отвечающая за обработку клика по элементам навигации
    function handleClick(event: React.MouseEvent<HTMLElement>) {
        const target = event.target as HTMLElement;
        const targetChoice = target.closest(`span.${styles.NavBarOption}`)!.getAttribute("data-link")!;
        //Пушим в роутер выбранную опцию
        router.push(targetChoice, undefined, {shallow: true});
    };


    return (
        <div className={styles.NavBar} data-testid={'NavBar'}>
            <div className={styles.LogoContainer}>
                <Image src={'/LOGO.svg'} width={100} height={50}/>
            </div>
            <span className={styles.NavBarOption} data-link={'/'} onClick={handleClick}>Finance</span>
            <span className={styles.NavBarOption} data-link={'/exchange'} onClick={handleClick}>Exchange rates</span>
            {account.email ?
                <div data-testid={'Account'} className={styles.AccountContainer}><Account email={account.email} nickname={account.nickname}/></div>
                :
                null
            }
        </div>
    )
}