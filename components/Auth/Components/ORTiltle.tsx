import styles from '../Styles/ORTitle.module.sass'

export default function ORTiltle() {
    return (
        <div className={styles.ORTitleBox}>
            <div className={styles.ORLine}/>
            <span className={styles.ORText}>OR</span>
            <div className={styles.ORLine}/>
        </div>
    )
}