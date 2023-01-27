import React from "react";
import styles from '../Styles/Header.module.sass'

interface StatusProps {
    status: string
}

export default function Header({status}: StatusProps) {
    if (status === 'login') return <div className={styles.LoginHeader}><b>Sign In</b></div>;
    if (status === 'recovery') return <div className={styles.LoginHeader}><b>Reset password</b></div>;
    return <div className={styles.LoginHeader}><b>Sign Up</b></div>;
}