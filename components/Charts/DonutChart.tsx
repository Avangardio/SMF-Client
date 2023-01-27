import dynamic from 'next/dynamic'
import {useSelector} from "react-redux";
import {financeSelector} from "../Redux/Reducers/financeReducer";
import {useEffect, useState} from "react";
import axios from "axios";
import styles from './DonutChart.module.sass'
import FormatMoney from "../Finance/Components/Utils/FormatMoney";
import {financeLink} from "../../LINKS";

const Chart = dynamic(() => import('react-apexcharts'), {ssr: false});

//object с валютами для удобства отображения
const currencies: any = {
    'USD': "$",
    'EUR': '€',
    'TRY': "₺",
    'GBP': "£",
    'RUB': "₽"
}
//Функция-компонент, ответственная за обработку и вывод чарта, пропсы - массив затрат
export default function DonutChart({dates}: { dates: string[] }) {
    //стейт для обьекта валют
    const [currencyList, setCurrencyList] = useState(null);
    //Стейт для выделения валюты
    const [currency, setCurrency] = useState('USD');
    //Стейт для выбора формата вывода??? формы денег
    const [option, setOption] = useState<'Expenses' | 'Earnings'>('Expenses');
    //Загружаем дату из стора, отфильтрованный по датам
    const store = useSelector(financeSelector).data
        //дополнительно фильтруем по датам
        .filter(item => item.action_date >= dates[0] && item.action_date <= dates[1])

    //Функция для обработки смены опции
    function handleChange(event: any): void {
        //Деструктуризуем ивент
        const {name, value} = event.target;
        //Если таргет = option, обновляем соответсвтующий стейт
        if (name === 'option') setOption(event.target.value);
        //Если таргет = currency, обновляем соотвествующий стейт
        if (name === 'currency') setCurrency(event.target.value);
    }

    //Хук эффекта для запроса списка валют
    useEffect(() => {
        //отправляем запрос
        axios.get(`${financeLink}/finance/getCurrency`, {})
            .then(
                //Коллбек успеха, обновляем стейт
                result => setCurrencyList(result.data),
                //Коллбек ошибки идет вникуда...
                error => error
            );
    }, []);
    //Создаем счетчик для каждого типа
    let counter: any = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
    }

    if (store.filter(item => item.action_date >= dates[0] && item.action_date <= dates[1]).length <= 0 || !currencyList) return <div></div>
    //Считаем траты на каждую категорию
    store
        //Фильтруем по выьранной опции
        .filter(item => option === 'Expenses' ? item.action_amount! < 0 : item.action_amount! > 0)
        //Для каждого элемента
        .forEach(item => {
            //Считаем в выбранной валюте и добавляем по категориям
            counter[item.action_type!] += Math.round(Math.abs(item.action_amount!) * currencyList![`${item.action_currency}${currency}`]);
        })
    //Создаем опции для чарта
    const state = {
        series: Object.values(counter) as number[],

        options: {
            chart: {},
            labels: ["Technique", "Food", "Health", "Journey", "Bills", "Markets", "Dress", "Online", "Other"],
            dataLabels: {enabled: false},
            colors: ["#FE7E36", "#FFE81E", "#89FF2D", "#2AE0BF", "#EE29FF", "#66D1FF", "#FF6767", "#5B76FF", "#8b8b8b"],
            legend: {
                show: true,
                position: 'bottom' as 'bottom',
                fontSize: "14px",
                fontFamily: "Helvetica, Arial",
                markers: {
                    radius: 1,
                    strokeWidth: 0,
                    strokeColor: "#4f4f4f"
                }
            }
        }
    };
    //Функция для рассчета общего значения, параметр all отвечает за надобность общей суммы
    const counted = (all: boolean) => {
        return FormatMoney(store
            //дополнительно фильтруем где число меньше нуля = трата или больше = добыча, если all = truе, ничего не фильтруем
            .filter(item =>
                !all ?
                    option === 'Expenses'
                        ? item.action_amount! < 0
                        :
                        item.action_amount! > 0
                    : true)
            //Считаем каждый элемент с учетом выбранной валюты
            .reduce((accumulator, item) => accumulator += Math.round(item.action_amount! * currencyList![`${item.action_currency}${currency}`]), 0)
        )
    }
    return (
        <div className={styles.DonutContainer} id="chart">
            <span>Count in </span>
            {/*Селект для выбора валюты*/}
            <select name={'currency'} value={currency} onChange={handleChange}>
                <option value='USD'>USD</option>
                <option value='GBP'>GBP</option>
                <option value='TRY'>TRY</option>
                <option value='RUB'>RUB</option>
                <option value='EUR'>EUR</option>
            </select>
            <p>
                {/*Селект для выбора счетчика*/}
                <select name={'option'} value={option} onChange={handleChange}>
                    <option value={'Expenses'}>Expenses</option>
                    <option value={'Earnings'}>Earnings</option>
                </select>
                {/*Вывод количества*/}
                <span> {counted(false)} {currencies[currency]}</span><span
                className={styles.Total}> Total: {counted(true)} {currencies[currency]}</span>
            </p>

            <Chart
                options={state.options}
                series={state.series}
                type={'donut'}
            />
        </div>
    )
}