import styles from '../Styles/ListElement.module.sass'
import FormatMoney from "../Utils/FormatMoney";

//object с валютами для удобства отображения
const currencies: any = {
    'USD': "$",
    'EUR': '€',
    'TRY': "₺",
    'GBP': "£",
    'RUB': "₽"
}

//Функция-компонент, ответсвенная за выведение элемента списка трат, отвечает за выделение элемента
export default function ListElement({
                                        elementUpdate,
                                        data
                                    }: { elementUpdate: React.Dispatch<dataType>, data: dataType }) {
    return (
        <div className={styles.ListElementContainer} onClick={() => elementUpdate(data)}>
            <picture className={styles.ImageNest}>
                <img src={`Icon-${data.action_type}.svg`}
                     alt={'Type'}
                     className={`${styles.TypeIcon}
                      ${styles[`Type${data.action_type}`]}`}
                />
            </picture>
            <span className={styles.Name}>
                {data.action_name}
            </span>
            <span className={`${styles.Amount} ${styles[data.action_amount! > 0 ? 'Positive' : 'Negative']}`}>
                {FormatMoney(data.action_amount!) + " " + currencies[data.action_currency!]}
            </span>
            <span className={styles.Edit}>
                •••
            </span>
        </div>
    )
}