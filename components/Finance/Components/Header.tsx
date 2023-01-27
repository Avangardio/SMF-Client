import styles from './Styles/Header.module.sass'
import Image from "next/image";
import dayjs from "dayjs";
import {useState} from "react";
import Calendar from "../../Calendar/Calendar";

//Интерфейс для Компонента
interface HeaderInterface {
    //стейт дат: ГГГГ-ММ-ДД
    dates: string[],
    //диспатч стейта дат
    setDates: React.Dispatch<DateType[]>
    elementUpdate: React.Dispatch<dataType>
}

//Функция-компонент, отвечающий за отображение выбранного участка
export default function Header({dates, setDates, elementUpdate}: HeaderInterface) {
    //Стейт для отображения календаря
    const [dialog, setDialog] = useState<boolean>(false);

    //Функция для обработки отображения
    function formatDates() {
        //Создаем строку ответа
        let output: string = '';
        //Если даты совпадают
        if (dates[0].slice(0, 8) === dates[1].slice(0, 8)) {
            output = new Date().getFullYear() === +dates[0].slice(0, 4)
                ?
                `${Intl.DateTimeFormat('en', {month: 'long'}).format(new Date(dates[0]))}`
                :
                `${Intl.DateTimeFormat('en', {month: 'long'}).format(new Date(dates[0]))} ${new Date(dates[0]).getFullYear()}`;
            return output;
        }
        //Проверяем, запросил ли пользователь всю дату
        if (dates[0] === '1990-01-01') {
            //Возвразаем новый аутпут
            output = 'All Time';
            return output;
        }
        //заполняем инпут
        output = `${Intl.DateTimeFormat('en', {month: 'long'}).format(new Date(dates[0]))} ${new Date(dates[0]).getFullYear()}` + ' to ' +
            `${Intl.DateTimeFormat('en', {month: 'long'}).format(new Date(dates[1]))} ${new Date(dates[1]).getFullYear()}`
        //Если даты не совпадают

        return output;
    }

    return (
        <>
            <div className={styles.FinHeader}>
                    <span>
                        {`Expenses for `}
                    </span>
                <a id={'HeaderSpan'} onClick={() => setDialog(true)}>
                    {formatDates()}
                </a>
                <Image src={'/Add-Icon.svg'}
                       width={150}
                       height={150}
                       className={styles.HeaderImage}
                       onClick={() => elementUpdate({
                           action_date: dayjs().format('YYYY-MM-DD'),
                           action_amount: 0,
                           action_name: "New Record",
                           action_type: 0
                       })}
                />
            </div>
            {dialog ? <Calendar date={dates} dateUpdate={setDates} setDialog={setDialog}/> : null}
        </>
    )
}