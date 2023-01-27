import React, {useState} from "react";
import dayjs from "dayjs";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Box} from "@mui/material";
import styles from '../Styles/ElementForm.module.sass'
import FormatMoney from "../Utils/FormatMoney";
import ErrorNotify from "../../../Auth/Components/ErrorNotify";
import axios from "axios";
import Loading from "../../../Animations/Loading";
import StatusElement from "../../../Animations/StatusElement";
import handleKeyDownForNumbers from "../../../Utils/handleKeyDown/handleKeyDownForNumbers";
import {financeLink} from "../../../../LINKS";

//определяем интерфейс для стейта формы и для полных пропсов
interface IFormData {
    action_id?: number | null,
    action_date: string,
    action_name?: string,
    action_description?: string,
    action_type?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
    action_amount?: number,
    action_currency?: string
    updateElement?: React.Dispatch<undefined>
}

//object с валютами для удобства отображения
const currencies: any = {
    'USD': "$",
    'EUR': '€',
    'TRY': "₺",
    'GBP': "£",
    'RUB': "₽"
}
//Функция-компонент, ответсвтенвный за форму
export default function ElementForm(dataProps: IFormData) {
    //Определяем стейт, где что-то заменяется либо есть дефолные значения
    const [formData, updateFormData] = useState<IFormData>({
        action_id: dataProps.action_id || null,
        action_amount: dataProps.action_amount || 0,
        action_currency: dataProps.action_currency || '',
        action_name: dataProps.action_name || '',
        action_type: dataProps.action_type || 0,
        action_description: dataProps.action_description || '',
        action_date: dataProps.action_date || dayjs().format('YYYY-MM-DD')
    });
    //Определяем стейт ошибки
    const [error, setError] = useState<string>('');
    //Создаем стейт состояния запроса
    const [status, setStatus] = useState<string | null>(null);

    //функция, ответсьвенная за поддержку изменеия стейта
    function handleChange(event: React.ChangeEvent<any>): void {
        //Очищаем ошибки
        setError('');
        //ВАЖНО! проверяем длину числа
        if (event.target.name === 'amount' && event.target.value.toString().length > 14) return;
        //Обновляем стейт
        updateFormData({...formData, ['action_' + event.target.name]: event.target.value});
    }

    //Функция-обработчик отправки формы
    function handleSubmit(event: any) {
        //Превентируем дефолт :)
        event.preventDefault();
        //Далее, после проверки, проверяем, есть ли поинт, тогда обрываем функцию.
        if (checkInputs(false)) return;
        //Иначе, отправляем запрос ЛИБО на измение если есть айдишник, либо на создание
        axios.post(`${financeLink}/finance/${formData.action_id ? 'changeAction' : 'addNewAction'}`, {
            data: formData
        }, {withCredentials: true})
            //Ждем коллбеков
            .then(
                //Обновляем статус
                response => {
                    //обовлянем статус
                    setStatus('success');
                    //через poltory секунды удаляем
                    return new Promise(resolve => setTimeout(() => resolve(''), 1500))
                        //...И удаляем элемент
                        .then(() => dataProps.updateElement!(undefined))
                },
                //Обновляем статус
                error => setStatus('error')
            )
        //Так как запрос асинхронный, обновляем стейт статуса на загрузку
        setStatus('loading');
    }

    //Функция для проверки всего стейта
    function checkInputs(soft: boolean) {
        //Добавляем поинт, если будет ошибка, он станет тру
        let stopPoint: boolean = false;
        //Проверяем все инпуты
        Object.entries(formData).forEach(([key, value]) => {
            //если не прошла проверку, обновляем ошибку
            if (switchCheck(key, value) !== null) {
                //обновляем ошибку если не стоит софт режим
                if (!soft) setError(switchCheck(key, value)!);
                //Обновляем поинт
                stopPoint = true;
            }
        });
        //возвращаем стоппоинт
        return stopPoint;
    }

    //Функция для проверки каждого стейта
    function switchCheck(name: string, value: any) {
        //Проверяем каждый инпут
        switch (name) {
            case 'action_name':
                //длина тайтла должна быть не больше 44
                return value.length > 44 ? 'Title is too big' : null;
            case 'action_type':
                //Тип должен быть от 1 до 9
                return (value > 9 && value < 1) ? 'Type is incorrect' : null;
            case 'action_amount':
                //Сумма должна быть корректной и модуль суммы не равен нулю
                return isNaN(value) || Math.abs(value) === 0 ? 'Amount is incorrect' : null;
            case 'action_currency':
                //Валюта должна совпадать со списком
                return !["GBP", "USD", "TRY", 'EUR', "RUB"].includes(value) ? 'Currency is incorrect' : null;
            case 'action_date':
                //Создаем дату
                const date = new Date(value);
                //Проверяем корректность даты
                return !(date instanceof Date && !isNaN(date.valueOf())) ? 'Date is incorrect' : null;
            default:
                return null;
        }
    }

    //Если статус загрузки есть, отображаем его вместо всего
    if (status) return (
        <div className={styles.StatusContainer}>
            {status === 'loading' ? <Loading/> : <StatusElement status={status}/>}
        </div>
    )
    //Возвращаем форму
    return (
        <form className={styles.ElementForm} onSubmit={handleSubmit}>
            {/*Инпут, отвечающий за ввод имени*/}
            <input
                className={styles.NameForm}
                name={`name`}
                value={formData.action_name}
                placeholder={'Title of the record'}
                onChange={handleChange}
                maxLength={44}
            />
            {/*Текстовая зона, ответственная за ввод описания*/}
            <textarea
                className={styles.DescriptionTextArea}
                name={`description`}
                value={formData.action_description}
                placeholder={'Description of the record'}
                onChange={handleChange}
            />
            {/*Инпут, отвечающий за ввод суммы*/}
            <input
                className={styles.AmountForm}
                name={`amount`}
                value={formData.action_amount}
                placeholder={'Amount'}
                onChange={handleChange}
                onKeyDown={handleKeyDownForNumbers}
                maxLength={14}
            />
            {/*Селект, ответственный за выбор типа*/}
            <select className={styles.OptionForm} name={'type'} value={formData.action_type} onChange={handleChange}>
                <option disabled value={0}>Select Type</option>
                <option value={1}>Technique</option>
                <option value={2}>Food</option>
                <option value={3}>Health</option>
                <option value={4}>Journey</option>
                <option value={5}>Bills</option>
                <option value={6}>Markets</option>
                <option value={7}>Dress</option>
                <option value={8}>Online</option>
                <option value={9}>Other</option>
            </select>
            {/*Селект, ответственный за выбор валюты*/}
            <div className={styles.CurrencyFormContainer}>
                <select className={styles.CurrencyForm} name={'currency'} value={formData.action_currency}
                        onChange={handleChange}>
                    <option disabled value={''}>Currency</option>
                    <option value={"GBP"}>GBP</option>
                    <option value={"USD"}>USD</option>
                    <option value={"TRY"}>TRY</option>
                    <option value={'EUR'}>EUR</option>
                    <option value={"RUB"}>RUB</option>
                </select>
                <span>{(isNaN(+formData.action_amount!) ? '---' : FormatMoney(formData.action_amount!)) + ' ' + (formData.action_currency ? currencies[formData.action_currency] : '')}</span>
            </div>
            {/*Инпут, ответственный за выбор типа*/}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Date desktop"
                    inputFormat="YYYY-MM-DD"
                    value={formData.action_date}
                    onChange={(newDate) => updateFormData({
                        ...formData,
                        ['action_date']: dayjs(newDate).format('YYYY-MM-DD')!
                    })}
                    renderInput={({inputRef, inputProps, InputProps}) => (
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <input className={styles.CalendarMUI} ref={inputRef} {...inputProps} />
                            {InputProps?.endAdornment}
                        </Box>
                    )}/>
            </LocalizationProvider>
            {/*Ошибка или инпут отправки формы*/}
            {error ?
                <div className={styles.ErrorContainer + " " + styles.Shaking}><ErrorNotify message={error}/></div>
                :
                <input disabled={checkInputs(true)}
                       className={`${styles.SubmitForm} ${!checkInputs(true) ? styles.Active : ''}`} value={'Submit'}
                       type={'submit'}/>}
        </form>
    )
}