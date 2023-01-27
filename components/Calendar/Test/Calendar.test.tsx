import Calendar from "../Calendar";
import "@testing-library/jest-dom";
import {act, cleanup, render, screen} from "@testing-library/react";
import React from "react";

describe('Calendar Testing', function () {
    const setStateMock = jest.fn();
    afterEach(cleanup)
    //Первый тест - пропсы отсутствуют
    it('[CALENDAR] - (1) - Данных нет', () => {
        expect(() => {
            //Рендерим с подключенным стором
            // @ts-ignore
            render(<Calendar/>)
        })
            //Должен выкинуть TypeError
            .toThrow(TypeError);
    })
});