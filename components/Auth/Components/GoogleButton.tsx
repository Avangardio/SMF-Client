import styles from '../Styles/ExternalLogins.module.sass'
import {signIn} from "next-auth/react";


export default function GoogleButton() {
    return (
        <div className={`${styles.GoogleButton} ${styles.WithShadow}`} onClick={() => signIn('google')}>
            <img src={'Google-Logo.svg'}/>
            <span>Sign in with Google</span>
        </div>
    )
}