import styles from '../Styles/ListHeader.module.sass'
//Функция-компонент, ответственная за отображение заголовка дня траты + возможность выбора для добавления нового элемента
export default function ListHeader({elementUpdate, date}: { date: string, elementUpdate: React.Dispatch<dataType> }) {
    //За это тоже извиняюсь.
    return (
        <div className={styles.ListHeaderContainer}>
            <span>
                {`${new Date(date).toLocaleString('en-us', {
                    month: 'long',
                    day: 'numeric'
                })}${new Date().getFullYear() !== +date.slice(0, 4) ? ' ' + new Date(new Date(date)).getFullYear() : ''}`}
            </span>
        </div>
    )
}