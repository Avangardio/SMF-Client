import styles from '../Styles/ExternalLogins.module.sass';
import {signIn} from "next-auth/react"


export default function AppleButton() {
    return (
        <div className={`${styles.AppleButton} ${styles.WithShadow}`} onClick={() => signIn()}>
            <img src={'Apple-Logo.svg'}/>
            <span>Sign in with Apple</span>
        </div>
    )
}