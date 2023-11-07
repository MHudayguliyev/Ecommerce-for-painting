import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from '../types/CategoriesReducerTypes';

const initialState: InitialState = {
    catalog: {
        _id: '', title: ''
    },
    setName: ''
}

const CategoriesSlicer = createSlice({
    name: 'categories', 
    initialState: initialState, 
    reducers: {
        setCatalogName: (state, action: PayloadAction<{_id:string, title:string}>) => {
            state.catalog = action.payload
        }, 
        setSetName: (state, action) => {
            state.setName = action.payload
        }
    }
})

export const { setCatalogName, setSetName } = CategoriesSlicer.actions
export default CategoriesSlicer.reducer