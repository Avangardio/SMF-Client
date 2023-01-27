import styles from '../Styles/DataPick.module.sass'
import {useState} from "react";

interface ICalendarProps {
    date: string[]
    dateUpdate: React.Dispatch<string[]>
    handleSubmit?: any
}

//Функция-компонент, продставляющая из себя выбор даты с сабмитом
export default function DatePick({date, dateUpdate, handleSubmit}: ICalendarProps) {
    //2021-12-23
    const [myDate, setMyDate] = useState<string[]>(date);

    //Функция для создания опций для инпута
    function createOptions() {
        let array = [];
        for (let i = 2030; i > 1990; i--) {
            array.push(<option value={`${i}`}>{i}</option>)
        }
        return array;
    }

    //функция для корректировки изменения
    function handleChange(event: any, from: boolean, month: boolean) {
        //МУТИРУЕМ??? стейт но без ререндера
        myDate[from ? 0 : 1] = stringReplacer(myDate[from ? 0 : 1], month, event.target.value);
        //обновляем стейт
        setMyDate([...myDate])
    }

    //2020-13-12
    //Функция для унификации изменения строки даты
    function stringReplacer(element: string, month: boolean, value: string) {
        //создаем массив
        let newString = element.split('');
        //Если нужно изменить месяц, то меняем месяц
        if (month) {
            newString[5] = value[0];
            newString[6] = value[1];
            return newString.join(``);
        }
        ;
        //если нужно изменить год, то меняем год
        newString[0] = value[0];
        newString[1] = value[1];
        newString[2] = value[2];
        newString[3] = value[3];
        return newString.join(``);
    }

    //Готовая форма
    const picker = (from: boolean) => {
        return (
            <>
                <select onChange={event => handleChange(event, from, true)}
                        value={from ? myDate[0].slice(5, 7) : myDate[1].slice(5, 7)}>
                    <option value={''} disabled={true}>Select Month</option>
                    <option value={'01'}>January</option>
                    <option value={'02'}>February</option>
                    <option value={'03'}>March</option>
                    <option value={'04'}>April</option>
                    <option value={'05'}>May</option>
                    <option value={'06'}>June</option>
                    <option value={'07'}>July</option>
                    <option value={'08'}>August</option>
                    <option value={'09'}>September</option>
                    <option value={'10'}>October</option>
                    <option value={'11'}>November</option>
                    <option value={'12'}>December</option>
                </select>
                <select onChange={event => handleChange(event, from, false)}
                        value={from ? myDate[0].slice(0, 4) : myDate[1].slice(0, 4)}>
                    <option value={''}>Select Year</option>
                    {createOptions()}
                </select>
            </>
        );
    }
    return (
        <div className={styles.DataPickContainer}>
            <span>From</span>
            <p>{picker(true)}</p>
            <span>To</span>
            <p>{picker(false)}</p>
            <a onClick={() => handleSubmit(date)} id={'closeCross'}>✖</a>
            <button onClick={() => handleSubmit(myDate)}>Submit</button>
        </div>
    )
}