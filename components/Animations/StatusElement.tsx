//Художественный компонент, отвечающий за отображение загрузки
import styles from './Styles/StatusElement.module.sass'

export default function StatusElement({status}: { status: string }) {
    return (
        <div className={styles.Container}>
            <img src={`/${status === 'error' ? 'Error' : 'Success'}-Icon.svg`}/>
        </div>
    )
}