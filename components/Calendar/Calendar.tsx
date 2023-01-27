import {useEffect, useRef, useState} from "react";
import DatePick from "./Components/DatePick";
import SuggesterPick from "./Components/SuggesterPick";
import styles from './Styles/Calendar.module.sass'

interface ICalendarProps {
    date: string[]
    dateUpdate: React.Dispatch<string[]>
    setDialog: React.Dispatch<boolean>
}

//Функция-компонент календаря
export default function Calendar({date, dateUpdate, setDialog}: ICalendarProps) {
    //Создаем стейт для статуса Окна календаря
    const [status, setStatus] = useState<boolean>(true);
    //добавляем референс
    const calendarRef = useRef<HTMLDivElement>(null);
    //Обьявляем функцию для отправки стейта
    const handleSubmit = (data: string[]) => {
        //обновляем стейт
        dateUpdate(data);
        //закрываем календарь
        setDialog(false);
    }
    useEffect(() => {
        //Для универсальности ищем позицию вызвающего элемента
        function handleResize() {
            //Если есть эелемент и документ
            if (typeof window !== undefined && calendarRef.current) {
                //Подстраиваем топ под вызовный элемент
                calendarRef.current.style.top = document.querySelector("#HeaderSpan")!.getBoundingClientRect().top + 40 + 'px';
                //Подстраиваем лефт под вызывающий элемент
                calendarRef.current.style.left = document.querySelector("#HeaderSpan")!.getBoundingClientRect().left - 100 + 'px';
            }
        }

        //Вызываем функцию сразу
        handleResize();
        //Обновляем при ресайзе
        window.addEventListener('resize', handleResize);
        //после анмаунта удаляем ивент
        return () => window.removeEventListener('resize', handleResize)
    }, [calendarRef])

    return (
        <>
            {/*Главный контейнер*/}
            <div ref={calendarRef} className={styles.CalendarContainer}>
                {/*Элемент для опций*/}
                <SuggesterPick date={date} dateUpdate={dateUpdate} handleSubmit={handleSubmit}/>
                {/*Элемент для выбора дат*/}
                <DatePick date={date} dateUpdate={dateUpdate} handleSubmit={handleSubmit}/>
            </div>
        </>
    )
}