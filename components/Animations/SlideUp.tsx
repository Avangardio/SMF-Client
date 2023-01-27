import styles from './Styles/SlideUp.module.sass'
import {useEffect, useState} from "react";

//Слайдер
export default function SlideUp() {

    const [scroll, setScroll] = useState(0);

    function handleScroll() {
        setScroll(window.scrollY);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    if (scroll === 0) return null;

    return (
        <div className={styles.SliderContainer} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src={'Slider-up-icon.svg'} alt={'SliderUp'}/>
        </div>
    )
}