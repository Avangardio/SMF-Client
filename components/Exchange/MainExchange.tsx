import styles from './Styles/Exchange.module.sass'
import Conventer from "./Components/Conventer";
import RatesList from "./Components/RatesList";

//Мейн функция-компонент для опредления курса валют
export default function MainExchange({rates}: {rates: TCurrenciesList}) {
    return (
        <div data-testid='Exchange' className={styles.MainExchangeContainer}>
            <span className={styles.Header}>Exchange rates (Updates every hour)</span>
            <RatesList rates={rates}/>
            <span className={styles.ExchangerHeader}>Currency exchanger</span>
            <Conventer rates={rates}/>
        </div>
    )
}