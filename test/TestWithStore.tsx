import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import {act, render} from '@testing-library/react'

import { combinedReducer , RootState } from '../components/Redux/store'
import {ReactElement, ReactNode} from "react";
import NavBar from "../components/Navigation/NavBar";

const testStore = (state: Partial<RootState>) => {
    return configureStore({
        reducer: combinedReducer,
        preloadedState: state
    })
}

export const renderWithStore = (component: ReactElement, initialState: any) => {
    const Wrapper = ({ children }: {children: ReactElement}) => (
        <Provider store={testStore(initialState)}>{children}</Provider>
    )
    return render(component, { wrapper: Wrapper })
}