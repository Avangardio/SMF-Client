import {ChangeEvent, useRef, useState} from "react";
import handleKeyDownForNumbers from "../../Utils/handleKeyDown/handleKeyDownForNumbers";
import Counter from "./Counter";
import styles from '../Styles/Conventer.module.sass'
//Функция-компонент, ответственная за конвертер валют
export default function Conventer({rates}: {rates: TCurrenciesList }) {
    //Определяем стейт выбранной валюты
    const [currency, setCurrency] = useState<string>('');
    //Определяем стейт для инпута
    const [inputValue, setInputValue] = useState<string>('');
    //Определяем референс для инпута
    const inputRef = useRef<HTMLInputElement>(null);
    //Определяем функцию для ченджа инпута и селекта
    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        //деструктуризируем ивент
        const {name, value} = event.target;
        //берем из ивента имя инпута и в зависмости от него меняем определенный стейт
        //Если ивент на обновления значения инпута, то обязательно сначала проверяем, число ли это, иначе не возвращаем ничего
        if (name === 'inputValue' && inputRef.current) {
            inputRef.current.style.width > '10ch' ? inputRef.current.style.width = inputValue.length + "ch" : null;
            return setInputValue(value);
        }
        //Если ивент на обновления выбранной валюты
        if (name === 'currency') return setCurrency(value);
    }
    //Считаем и сохраняем переведенную валюту
    return (
        <div className={styles.ConventerContainer}>
            {/*Инпут для числа*/}
            <input name={'inputValue'}
                   ref={inputRef}
                   placeholder={'Type value'}
                   value={inputValue}
                   maxLength={14}
                   onKeyDown={handleKeyDownForNumbers}
                   onChange={handleChange}
            />
            {/*Селект для выбранной валюты*/}
            <select name={'currency'}
                    data-testid={'currencySelect'}
                    value={currency}
                    onChange={handleChange}
            >
                <option value={''}>Currency</option>
                <option value={'USD'}>$</option>
                <option value={'EUR'}>€</option>
                <option value={'TRY'}>₺</option>
                <option value={'GBP'}>£</option>
                <option value={'RUB'}>₽</option>
            </select>
            {/*Если все поля заполнены, то рисуем равно и элемент*/}
            {
                inputValue && currency && !isNaN(+inputValue) ?
                    (
                        <>
                            <span>=</span>
                            <Counter value={+inputValue} currency={currency} list={rates } />
                        </>
                    )
                    : null
            }
        </div>
    )
}