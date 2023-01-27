import axios from "axios";
import {financeLink} from "../../LINKS";
//Создаем еще один сср для получения данных валют
export const SSRGetExchangeRates = async () => {
    //Отправляем запрос на сервер для получения валютных дат
    const answer = await axios(`${financeLink}/finance/getCurrency`, {});
    //Возвращаем нулль если нет ответа
    if (!answer) return {
        props: {
            rates: null
        }
    };
    //Возвращаем данные
    return {
        props: {
            rates: answer.data! || null
        }
    }
}
//Экспкортируем функцию
export default SSRGetExchangeRates;