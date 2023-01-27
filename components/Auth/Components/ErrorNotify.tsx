import styles from '../Styles/ErrorNotify.module.sass'

interface message {
    message: string
}


export default function ErrorNotify({message}: message) {
    return (
        <div id={'notify'} className={`${styles.ErrorNotify}`}
             style={{display: message ? 'block' : 'none'}}>{message}</div>
    )

}