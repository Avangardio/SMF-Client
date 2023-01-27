import {act, cleanup, screen, render} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Authentication from "../Authentication";
import React from "react";
import {renderWithStore} from "../../../test/TestWithStore";
import mockAxios from '../../../test/__mocks__/axios';
//        //Перехватываем запросы
//         jest.mock("../Authentication", () => {
//             return function (request: any) {
//                 return new Promise((resolve) => {
//                     resolve('ok');
//                 });
//             };
//         });
afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
});

describe('Authentication Testing',  function () {
    afterEach(cleanup)
    //Первый тест - проверка отрисовки окна логина
    it('[AUTHENTICATION] - (1) - ПРОВЕРКА ОТРИСОВКИ ЛОГИНА',  () => {
        //Рендерим компонент
        act(() => {
            renderWithStore(<Authentication />, {auth: {token: 'token', account: {email: '', nickname: ''}}})
        })
        //Проверяем, зарендерился ли навигационный центр
        expect(screen.getByTestId("Auth")).toBeInTheDocument();
        //Проверяем, есть ли все элементы регистрации
        //Заголовок регистрации
        expect(screen.getByText("Sign Up")).toBeInTheDocument();
        //Инпут Почты
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        //Инпут Пароля
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        //Кнопку гугл логина
        expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
        //Кнопку эпл логина
        expect(screen.getByText("Sign in with Apple")).toBeInTheDocument();
    })
    //Второй тест - проверка отрисовки окна регистрации
    it('[AUTHENTICATION] - (2) - ПРОВЕРКА ОТРИСОВКИ РЕГИСТРАЦИИ',  async () => {
        //Рендерим компонент
        act(() => {
            renderWithStore(<Authentication />, {auth: {token: 'token', account: {email: '', nickname: ''}}})
        })
        //Проверяем, зарендерился ли навигационный центр
        expect(screen.getByTestId("Auth")).toBeInTheDocument();
        //Кликаем по кнопке регистрации
        await userEvent.click(screen.getByText('Sign Up', {exact: false}));
        //Проверяем, есть ли все элементы регистрации
        //Заголовок регистрации
        expect(screen.getByText("Sign Up")).toBeInTheDocument();
        //Инпут Почты
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        //Инпут Пароля
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        //Инпут Никнейма
        expect(screen.getByPlaceholderText("Nickname")).toBeInTheDocument();
        //Кнопку гугл логина
        expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
        //Кнопку эпл логина
        expect(screen.getByText("Sign in with Apple")).toBeInTheDocument();
    })
    //Третий тест - проверка отрисовки смены пароля
    it('[AUTHENTICATION] - (3) - ПРОВЕРКА ОТРИСОВКИ СМЕНЫ ПАРОЛЯ',  async () => {
        //Рендерим компонент
        act(() => {
            renderWithStore(<Authentication />, {auth: {token: 'token', account: {email: '', nickname: ''}}})
        })
        const user = userEvent.setup()
        //Проверяем, зарендерился ли навигационный центр
        expect(screen.getByTestId("Auth")).toBeInTheDocument();
        //Кликаем по кнопке смены пароля
        await userEvent.click(screen.getByText('Forgot password?', {exact: false}));
        //Проверяем, есть ли все элементы регистрации
        //Заголовок
        expect(screen.getByText("Reset password")).toBeInTheDocument();
        //Инпут Почты
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        //Находим инпут, на этом можно будет закончить

    })
})