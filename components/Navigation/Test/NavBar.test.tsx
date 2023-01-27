import NavBar from "../NavBar";
import "@testing-library/jest-dom";
import {act, cleanup, render, screen} from "@testing-library/react";
import {renderWithStore} from "../../../test/TestWithStore";

describe('NavBar Testing', function () {
    afterEach(cleanup)
    //Первый тест - данные об аккаунте отсутствуют
    it('[NAVBAR] - (1) - АККАУНТ ОТСУТСТВУЕТ', () => {
        //Создаем кастомный стор без аккаунта
        const customInitialState = {
            auth: {
                token: 'token',
                account: {
                    email: '',
                    nickname: ''
                }
            }
        };
        //Рендерим с подключенным стором
        act(() => {
            renderWithStore(<NavBar />, customInitialState)
        })
        //Проверяем, зарендерился ли навигационный центр
        expect(screen.getByTestId("NavBar")).toBeInTheDocument();
        //Проверяем, есть ли окошко с аккаунтом внутри, его не должно быть
        expect(!screen.findByTestId('Account'))
    })
    //Второй тест - данные об аккаунте есть
    it('[NAVBAR] - (2) - АККАУНТ ПРИСУТСТВУЕТ', () => {
        //Создаем кастомный стор с аккаунтом
        const customInitialState = {
            auth: {
                token: 'token',
                account: {
                    email: 'TEST@GMAIL.com',
                    nickname: 'TEST'
                }
            }
        };
        //Рендерим с подключенным стором
        act(() => {
            renderWithStore(<NavBar />, customInitialState)
        })
        //Проверяем, зарендерился ли навигационный центр
        expect(screen.getByTestId("NavBar")).toBeInTheDocument();
        //Проверяем, есть ли окошко с аккаунтом внутри, он должен быть
        expect(screen.getByTestId('Account')).toBeInTheDocument();
    })
});