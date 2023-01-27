import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useSelector} from 'react-redux';
import {authSelector} from "../components/Redux/Reducers/authReducer";
import getServerSideProps from "../components/SSR/SSRAuth";
import MainFinance from "../components/Finance/MainFinance";
import NewUserOverlay from "../components/Overlays/NewUserOverlay";


export default function Home() {
    const account = useSelector(authSelector).account;
    return (
        <div className={styles.container}>
            <Head>
                <title>My Finances</title>
                <meta name="keywords" content="Save, Finance, Tracker, Money, Money tracker, Count, Count Money"/>
                <meta name="author" content="Avangardio"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="description"
                      content="Share for your money with the help of the SaveMyFinance service. Add, delete and change entries and you will be able to keep track of your finances."/>
                <link rel="icon" href="/SMF.ico"/>
            </Head>
            <main>
                {account.email && account.nickname ? <MainFinance/> : <NewUserOverlay/>}
            </main>
        </div>
    )
}

export {getServerSideProps};

