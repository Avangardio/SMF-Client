import styles from '../Styles/MainElement.module.sass'
import ElementForm from "./ElementForm";
import ElementOverlay from "../../../Overlays/ElementOverlay";
import axios from "axios";
import {financeLink} from "../../../../LINKS";

//определяем интерфейс для стейта формы и для полных пропсов
interface IFormData {
    action_id?: number | null,
    action_date: string,
    action_name?: string,
    action_description?: string,
    action_type?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
    action_amount?: number,
    action_currency?: string
    updateElement: React.Dispatch<undefined>
}

//Функция-компонент, ответсвтенная за выведение Элемента
export default function MainElement(data: IFormData) {

    //Функция, отвеающая за отправку запроса на удаление и уничтожение компонента
    function handleDelete() {
        //отправляем запрос на сервер
        axios.get(`${financeLink}/finance/deleteAction?id=${data.action_id}`, {withCredentials: true})
            //убиваем элемент при успехе
            .then(
                result => data.updateElement(undefined),
                //с ошибкой ничего не делаем
                error => null
            )
    }

    return (
        <>
            {/*Оверлей для внимания*/}
            <ElementOverlay/>
            {/*Контейнер*/}
            <div className={styles.MainElementContainer}>
                {/*Тайтл действия*/}
                <span
                    className={styles.MainElementHeader}>{data.action_name !== 'New Record' ? 'Edit Record' : 'Add new Record'}</span>
                {/*Кнопка выхода*/}
                <a className={styles.Back} onClick={() => data.updateElement(undefined)}>Back</a>
                {/*Кнопка удаления*/}
                {data.action_id ? <a className={styles.Delete} onClick={() => handleDelete()}>Delete</a> : null}
                {/*Форма*/}
                <ElementForm action_date={data.action_date}
                             action_name={data.action_name || ''}
                             action_amount={data.action_amount || 0}
                             action_currency={data.action_currency || ''}
                             action_description={data.action_description || ''}
                             action_type={data.action_type || 9}
                             action_id={data.action_id || null}
                             updateElement={data.updateElement}
                />
            </div>
        </>
    )
}