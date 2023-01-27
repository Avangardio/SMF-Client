import styles from "../Styles/Exchange.module.sass";

//Функция-компонент, ответветственная за вывод списка курс валют
export default function RatesList({rates}: {rates: TCurrenciesList}){
    //Создаем элементы
    const List = (type: 'USD' | 'EUR' | 'GBP' | 'TRY' | 'RUB') => {
        return (
            Object.entries(rates)
                .map(item => {
                    if(item[0].slice(0,3) === type && item[1] !== 1) return (
                        <tr>
                            <td>{item[0]}</td>
                            <td> : </td>
                            <td>{item[1].toFixed(2)}</td>
                        </tr>
                    )
                })
        )
    }
    //создаем элемент с заголовком
    const Element = (type: 'USD' | 'EUR' | 'GBP' | 'TRY' | 'RUB') => {
        return (
            <>
                <span>{type}</span>
                <table>
                    <tbody>
                        {List(type)}
                    </tbody>
                </table>
            </>
        )
    }
    return (
        <>
            <div className = {styles.cUSD}>{Element('USD')}</div>
            <div className = {styles.cEUR}>{Element('EUR')}</div>
            <div className = {styles.cGBP}>{Element('GBP')}</div>
            <div className = {styles.cTRY}>{Element('TRY')}</div>
            <div className = {styles.cRUB}>{Element('RUB')}</div>
        </>
    )
}