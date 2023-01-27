import styles from '../Styles/SuggesterPick.module.sass'
import dayjs from "dayjs";

interface ICalendarProps {
    date: string[]
    dateUpdate: React.Dispatch<string[]>
    handleSubmit?: any
}

//Функция-компонент, отвестввенная за отправку предложенных опций
//ПРОШУ ПРОЕНИЯ ПЕРЕД ТЕМИ, КТО ЭТО БУДЕТ СМОТРЕТЬ
export default function SuggesterPick({date, dateUpdate, handleSubmit}: ICalendarProps) {
    return (
        <div className={styles.SuggesterPickContainer}>
            <p>
                <a onClick={() =>
                    handleSubmit([dayjs()
                        .startOf("month")
                        .format('YYYY-MM-DD')
                        ,
                        dayjs()
                            .endOf("month")
                            .format('YYYY-MM-DD')])}>
                    Last Month
                </a>
            </p>
            <p>
                <a onClick={() => handleSubmit([dayjs().subtract(6, 'month')
                    .startOf('month')
                    .format('YYYY-MM-DD'),
                    dayjs()
                        .endOf("month")
                        .format('YYYY-MM-DD')])}>
                    Last 6 Month
                </a>
            </p>
            <p>
                <a onClick={() => handleSubmit([dayjs().subtract(1, 'year')
                    .startOf('month')
                    .format('YYYY-MM-DD'),
                    dayjs()
                        .endOf("month")
                        .format('YYYY-MM-DD')])}>
                    Last Year
                </a>
            </p>
            <p>
                <a onClick={() => handleSubmit([
                    dayjs('1990-01-01').format('YYYY-MM-DD')
                    ,
                    dayjs().endOf("month").format('YYYY-MM-DD')])}>
                    All Time
                </a>
            </p>
        </div>
    )
}