import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import axios from "axios";

//Создаем Интерфейс будущего слайса
interface authReducer_storage {
    token: string
    account: {
        nickname: string
        email: string
    }
}

//Создаем стейт
const initialState: authReducer_storage = {
    token: '',
    account: {
        nickname: '',
        email: ''
    }
}
//Создаем и экспортируем слайс под именем auth и набором редьюсеров
export const authSlice = createSlice({
    //имя слайса
    name: 'auth',
    //стейт
    initialState,
    //набор редьюсеров для изменения стейта
    reducers: {
        //Редьюсер для аутентификации посредством прикрепления в стейт токена и аккаунта, если он есть.
        authUser: (state, action: PayloadAction<Auth_authUser>) => {
            //Проверяем, есть ли токен, тогда добавляем в стейт.
            if (action.payload.token) state.token = action.payload.token;
            //Проверяем, есть ли аккаунт, тогда добавляем в стейт.
            if (action.payload.account) state.account = action.payload.account;
        },
    },
})
//Экспортируем набор экшонов данного слайса.
export const {authUser} = authSlice.actions
//Экспортируем стейт
export const authSelector = (state: RootState) => state.auth;
//По дефолту экспортируем редьюсер слайса.
export default authSlice.reducer