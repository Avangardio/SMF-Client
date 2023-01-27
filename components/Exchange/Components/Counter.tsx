import styles from '../Styles/Counter.module.sass'
import FormatMoney from "../../Finance/Components/Utils/FormatMoney";
//Интерфейс для пропсов, включающее в себя: value = количество валюты, которое нужно обменять и currency = выбранная валюта, list = список валют
interface ICounterProps {
    value: number
    currency: string
    list: TCurrenciesList
}
const currenciesList: any = {
    'USD': "$",
    'EUR': '€',
    'TRY': "₺",
    'GBP': "£",
    'RUB': "₽"
}
//Функция-компонент, отвечающая за рассчет валют и вывода списка полученных чисел
export default function Counter({value, currency, list}: ICounterProps){
    //Определяем функцию для обработки списка валют с выводом нам нужных
    function getExchange(data: ICounterProps){
        //Превращаем в массив копию листа валют
        return Object.entries(data.list)
            //Проходим по каждому элементу массива
            .map((item, index) => {
                //Определяем константы из [currencies - курс валют as , rate - рейт обмена]
                const [currencies, rate] = item;
                //Проверяем, равно ли значение выбранному и НЕ сопабадают две частии
                if(currencies.slice(0,3) === data.currency && currencies.slice(0,3) !== currencies.slice(3)){
                    //Определеяем константу, являщаяся суммой*рейт валюты
                    const exchanged = (data.value*rate).toFixed(2)
                    //тогда возвращаем элемент списка
                    return (
                            <div key={index} className={styles.CounterElementContainer}>
                                <span>{FormatMoney(+exchanged).slice(1) + " "} </span>
                                <span>{currenciesList[currencies.replace(data.currency, '')]}</span>
                            </div>
                    )
                }
            })
    }
    return (
        <>
            {/*Контейнер*/}
            <div className={styles.CounterContainer}>
                {/*массив элементов*/}
                {getExchange({value, currency, list})}
            </div>
        </>
    )
}