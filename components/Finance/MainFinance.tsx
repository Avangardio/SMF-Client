import {useEffect, useState} from "react";
import dayjs from "dayjs";
import Header from "./Components/Header";
import {useDispatch, useSelector} from "react-redux";
import {changeAction, deleteAction, financeSelector, loadData, newAction} from "../Redux/Reducers/financeReducer";
import styles from './Components/Styles/MainFinance.module.sass'
import List from "./Components/List/List";
import SlideUp from "../Animations/SlideUp";
import MainElement from "./Components/Element/MainElement";
import Loading from "../Animations/Loading";
import {AppDispatch} from "../Redux/store";
import DonutChart from "../Charts/DonutChart";
import {financeLink} from "../../LINKS";

//Функция-компонент, отвечающая за общий модуль финансового приложения
export default function MainFinance() {
    //Создаем стейт с массивом дат - МЕСЯЦ: НАЧАЛО МЕСЯЦА - КОНЕЦ: КОНЕЦ МЕСЯЦА
    const [dates, setDates] = useState<DateType[]>([dayjs().startOf('month').format('YYYY-MM-DD'), dayjs().endOf('month').format('YYYY-MM-DD')]);
    //Создаем стейт с id выбранного элемента, ЛИБО с датой создания
    const [element, setElement] = useState<dataType | undefined>();
    //создаем диспатч
    const dispatch = useDispatch<AppDispatch>();
    //получаем статус стейта, а именно его состояния
    const status = useSelector(financeSelector).status;

    //хук эффекта для загрузки данных при смене даты
    useEffect(() => {
        dispatch(loadData(dates))
    }, [dates]);

    //хук эффекта, добавляющий реакцию на SSE
    useEffect(() => {
        //Открываем ивентсорс
        let eventSource = new EventSource(`${financeLink}/finance/sse`, {withCredentials: true});
        //Добавляем листенер на ивент, когда создается новый экшн
        eventSource.addEventListener('NewAction', event => {
            dispatch(newAction(JSON.parse(event.data)))
        });
        //добавляем листенер на ивент, когда удаляется экшн
        eventSource.addEventListener('DeleteAction', event => {
            dispatch(deleteAction({id: +event.data}))

        });
        //Добавляем листенер на ивент, когда изменяется экшн
        eventSource.addEventListener('ChangeAction', event => {
            dispatch(changeAction(JSON.parse(event.data)[0]))
        });

        return () => {
            //При анмаунте закрываем ивентСорс
            eventSource.close();
        };
    })
    //Вывод если идет загрузка
    if (status === 'loading') return (
        <div className={styles.LoadingContainer}>
            <Loading/>
        </div>
    );
    //Вывод если ошибка
    if (status === 'error') return (
        <div className={styles.ErrorContainer}>
            <img src={'/Error-Icon.svg'}/>
            <p><span>Something went wrong. Try to reload page</span></p>

        </div>
    );

    return (
        <div className={styles.MainFinanceGrid}>
            <SlideUp></SlideUp>
            <Header elementUpdate={setElement} dates={dates} setDates={setDates}/>
            {element ?
                <MainElement action_date={element.action_date}
                             action_name={element.action_name || ''}
                             action_amount={element.action_amount || 0}
                             action_currency={element.action_currency || ''}
                             action_description={element.action_description || ''}
                             action_type={element.action_type || 9}
                             action_id={element.action_id || null}
                             updateElement={setElement}

                />
                :
                null
            }
            <List elementUpdate={setElement} dates={dates}/>
            <DonutChart dates={dates}/>
        </div>
    )

}