import {SSRGetExchangeRates as getServerSideProps} from "../components/SSR/SSRGetExchangeRates";
import Head from "next/head";
import MainExchange from "../components/Exchange/MainExchange";
//SSR для получения данных
export {getServerSideProps}
//Функция-компонент, принимающая пропсы с SSR, отображает курсы валют
//По типу {'ВАЛЮТА1ВАЛЮТА2': число}
export default function Exchange({rates}: {rates: TCurrenciesList }) {
    return (
        <div>
            <Head>
                <title>Exchange rates</title>
                <meta name="keywords" content="Save, Finance, Tracker, Money, Money tracker, Count, Count Money, Exchange, Exchange rate, Currencies, Convert"/>
                <meta name="author" content="Avangardio"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="description" content="SaveMyFinance Currencies Exchange Rates."/>
                <link rel="icon" href="/SMF.ico"/>
            </Head>
            <main><MainExchange rates={rates}/></main>
        </div>
    )
}