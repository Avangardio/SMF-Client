import styles from "../../Overlays/Styles/NewUserOverlay.module.scss";
import React from "react";

export default function Suggestions({
                                        stateChanger,
                                        state
                                    }: { state: string, stateChanger: React.Dispatch<React.SetStateAction<Signs>> }) {
    return (
        <div className={styles.Suggestion}>
            {state === 'login' ? <span>Have an account? </span> : <span>No account? </span>}
            {state !== 'login' ? <a onClick={() => stateChanger('login')}>Sign In</a> :
                <a onClick={() => stateChanger('registration')}>Sign Up</a>}
        </div>
    )
}