import {act, cleanup, screen, render, fireEvent} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import {renderWithStore} from "../../../test/TestWithStore";
import mockAxios from '../../../test/__mocks__/axios';
import MainExchange from "../MainExchange";
import selectEvent from "react-select-event";
import FormatMoney from "../../Finance/Components/Utils/FormatMoney";
//Создаем объект для работы компонента
const rates = {"USDGBP":0.811127,"USDEUR":0.918461,"USDTRY":18.808634,"USDRUB":69.450133,"USDUSD":1,"EURGBP":0.883137,"EURRUB":75.615767,"EURTRY":20.478424,"EURUSD":1.088778,"EUREUR":1,"GBPUSD":1.232853,"GBPEUR":1.132327,"GBPRUB":85.621774,"GBPTRY":23.188273,"GBPGBP":1,"TRYUSD":0.053167,"TRYEUR":0.048832,"TRYRUB":3.69246,"TRYGBP":0.043125,"TRYTRY":1,"RUBUSD":0.014399,"RUBEUR":0.013225,"RUBGBP":0.011679,"RUBTRY":0.270822,"RUBRUB":1};

describe('Exchange Testing',  function () {
    afterEach(cleanup)
    //Первый тест - проверка отрисовки компонента курсов валют
    it('[EXCHANGE] - (1) - ПРОВЕРКА ОТРИСОВКИ КУРСОВ ВАЛЮТ',  async () => {
        //Рендерим компонент
        render(<MainExchange rates={rates} />)
        //Проверяем, зарендерилась ли страница
        expect(screen.getByTestId("Exchange")).toBeInTheDocument();
        //Проверяем, есть ли все элементы
        //Заголовок страницы
        expect(screen.getByText("Exchange rates (Updates every hour)")).toBeInTheDocument();
        //Далее, проверяем, чтобы присутствовали все элементы объекта курса валют
        await (() => Object.entries(rates).forEach(item => {
            //Получаем значения элемента массива из объекта
            const [key] = item;
            //Если Ключ состоит из одной валюты, то его не должно быть, если из разных - должен быть
            return key.slice(0,3) === key.slice(3) ? expect(!screen.findByText(key)) : expect(screen.findByText(key))
        }))();
    });
    //Второй тест - проверка отрисовки окна регистрации
    it('[EXCHANGE] - (2) - ПРОВЕРКА ОТРИСОВКИ КОНВЕНТЕРА',  async () => {
        //Рендерим компонент
        render(<MainExchange rates={rates} />)
        //Проверяем, зарендерился ли конвертер валют
        expect(screen.getByText("Currency exchanger")).toBeInTheDocument();
        //Проверяем, есть ли все элементы конвентера валют
        //Инпут суммы
        expect(!screen.findByText('='))

        expect(screen.getByPlaceholderText("Type value")).toBeInTheDocument();
        //Инпут выбора валюты
        expect(screen.getByText("Currency")).toBeInTheDocument();
        //Далее, заполняем сумму
        await userEvent.type(screen.getByPlaceholderText('Type value'), '300');
        //Выбираем валюту
        await userEvent.selectOptions(screen.getByTestId("currencySelect"), ['USD']);
        //Должно появиться '='
        expect(screen.getByText("=")).toBeInTheDocument();
        //И окно с валютами, для проверки ищем перевод в рублях
        expect(screen.getByText(`${FormatMoney(300*rates['USDRUB']).slice(1)}`)).toBeInTheDocument();


    })
})