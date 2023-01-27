import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import axios from "axios";
import {financeLink} from "../../../LINKS";

//Создаем стейт
const initialState: IFinanceReducer = {
    data: [],
    status: 'loading'
}
//Асинхронное действие, должно загружать данные с сервера
export const loadData = createAsyncThunk('auth/credentialsLogin', async (dates: string[]) => {
    const response = await axios.get(`${financeLink}/finance/loadFromRange?from=${dates[0]}&to=${dates[1]}`, {
        withCredentials: true
    });
    return response.data;
});
//Создаем и экспортируем слайс под именем auth и набором редьюсеров
export const authSlice = createSlice({
    //имя слайса
    name: 'finance',
    //стейт
    initialState,
    //набор редьюсеров для изменения стейта
    reducers: {
        newAction: (state, {payload}: PayloadAction<dataType>) => {
            //Мутируем стор, добавляя в него новый элемент
            state.data.push(payload);
        },
        deleteAction: (state, {payload}: PayloadAction<{ id: string | number }>) => {
            //Мутируем обьект, удаляя нужный элемент через фильтр
            state.data = state.data.filter(item => item.action_id !== payload.id);
        },
        changeAction: (state, {payload}: PayloadAction<dataType>) => {
            //Находим индекс в стейте
            const index = state.data.findIndex(item => item.action_id === payload.action_id);
            //Меняем стор мутабельно, изменяя нужный элемент
            state.data[index] = payload;
            console.log(state.data)
        }
    },
    extraReducers: (builder) => {
        builder
            //Редьюсер для зименения статуса стора и добавления информации
            .addCase(loadData.fulfilled, (state, {payload}: PayloadAction<dataType[]>) => {
                //Меняем статус загрузки
                state.status = 'ready';
                //Проверяем, есть ли что-то в ответе, мутируем стейт
                if (payload.length > 0) state.data = payload;
            })
            //Редьюсер для изменения статуса загрущки стора
            .addCase(loadData.pending, (state) => {
                //Меняем статус загрузки
                state.status = 'loading';
            })
            //Редьюсер для изменения статуса стора при ошибке
            .addCase(loadData.rejected, (state) => {
                //Меняем статус загрузки
                state.status = 'error';
            })
    },
})
//Экспортируем набор экшонов данного слайса.
export const {newAction, deleteAction, changeAction} = authSlice.actions
//Экспортируем стейт
export const financeSelector = (state: RootState) => state.finance;
//По дефолту экспортируем редьюсер слайса.
export default authSlice.reducer