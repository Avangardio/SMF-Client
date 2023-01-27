import {useSelector} from "react-redux";
import {financeSelector} from "../../../Redux/Reducers/financeReducer";
import ListHeader from "./ListHeader";
import ListElement from "./ListElement";
import styles from '../Styles/List.module.sass'


//Функция-Компонент, отвечающая за выведение списка трат
export default function List({elementUpdate, dates}: { elementUpdate: React.Dispatch<dataType>, dates: string[] }) {
    //Загружаем стор
    const store = useSelector(financeSelector);
    //Создаем список для обработки
    const list = [...store.data]
        //фильтруем по дате
        .filter(item => {
            return item.action_date >= dates[0] && item.action_date <= dates[1]
        })
        //Сортируем по дате
        .sort((a, b) => a.action_date! > b.action_date! ? -1 : a.action_date! < b.action_date! ? 1 : 0)
        //Далее, проходим по всему массиву
        .map((item, index, array) => {
            //Алгоритм следующий, сначала мы проверяем, первый ли элемент в списке, ИЛИ следующая запись имеет не такую же дату как прошлая
            if (index === 0 || item.action_date !== array[index - 1].action_date) {
                //Возвращаем Заголовок дня и запись
                return (
                    <>
                        <li key={100 + item.action_id!}><ListHeader elementUpdate={elementUpdate}
                                                                    date={item.action_date!}/></li>
                        <li key={200 + item.action_id!}><ListElement elementUpdate={elementUpdate} data={item}/></li>
                    </>
                )
            }
            //Если элемент идет не с новой датой, то просто оставляем его
            return <li key={300 + item.action_id!}><ListElement elementUpdate={elementUpdate} data={item}/></li>
        })

    //Если ничего не найдено, возращаем плашку что ничего нет
    if (list.length === 0) return (
        <div className={styles.NoDataContainer}>
            <span>No records for selected dates</span>
        </div>
    )

    //Возвращаем список
    return (
        <ul className={styles.ListContainer}>
            {list}
        </ul>
    )

}