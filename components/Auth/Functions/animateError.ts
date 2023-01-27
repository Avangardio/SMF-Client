import styles from "../Styles/InternalLogins.module.sass";

export default function animateError(): void {
    document.getElementById('notify')!.classList.toggle(styles.Shaking);
    setTimeout(() => document.getElementById('notify')!.classList.remove(styles.Shaking), 600);
}