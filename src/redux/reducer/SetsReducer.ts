import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import {  Sets } from '@app/api/Types';
import { InitialState } from '../types/SetsTypes';

const initialState: InitialState = {
    setsData: [], 
    setsDataLoading: false, 
    paintingsData: []
}

const SetsReducer = createSlice({
    name: 'sets', 
    initialState: initialState, 
    reducers: {
        setSetsDataSortByCatalogs: (state, action: PayloadAction<{active: string, setsList: Sets[]}>) => {
            const { active, setsList} = action.payload
            state.setsData = []
            state.setsDataLoading = true
            for(let j = 0; j < setsList.length; j++){
                const set = setsList[j]
                if(set.catalogName.length > 0){
                    const catalogs = set.catalogName
                    for(let ca = 0; ca < catalogs.length; ca++){
                        if(catalogs[ca] === active)
                            state.setsData.push({...set})
                    }
                }
            }
            state.setsDataLoading = false
        }, 
        setSetsDataSortBySubCatalogs: (state, action: PayloadAction<{active: string, setsList: Sets[]}>) => {
            const { active, setsList} = action.payload
            const leverage=[]
            state.setsDataLoading = true
            for(let j = 0; j < setsList.length; j++){
                const set = setsList[j]
                if(set.subCatalogName?.length > 0){
                    const subCatalogs = set.subCatalogName
                    for(let ca = 0; ca < subCatalogs.length; ca++){
                        if(subCatalogs[ca]?.subcatalogTitle === active)
                            leverage.push({...set})
                        // console.log("set", set)
                    }
                }
            }
            state.setsData = [...leverage]
            state.setsDataLoading = false
        }, 
        setPaintingsData: (state, action) => {
            state.paintingsData = action.payload
        }, 
        setPaintingDataFrame: (state, action) => {
            const { data, id } = action.payload
            const lev = [...state.paintingsData]
            for(let i = 0; i < lev.length; i++){
                if(lev[i]._id === id){
                    const paintCost = lev[i].paint.cost
                    const frameCost = data.label.cost as number
                    const updatedFrame = {...lev[i], frame: {
                        cost: data.label.cost, 
                        size: data.label.size, 
                        src: data.src,
                        name: data.label.name
                    }, 
                    total: Number(frameCost + paintCost)
                    }
                    lev[i] = updatedFrame
                }
            }
            state.paintingsData = lev
        }, 
        setPaintingDataPaint: (state, action) => {
            const { data, id, } = action.payload
            const lev = [...state.paintingsData]
            for(let i = 0; i < lev.length; i++){
                if(lev[i]._id === id){
                    const paintCost = data.label.cost as number
                    const frameCost = lev[i].frame.cost 
                    const updatedPaint = {...lev[i], paint: {
                        cost: data.label.cost, 
                        size: data.label.size, 
                        src: lev[i].paint.src,
                        name: lev[i].paint.name
                    }, 
                    total: Number(paintCost + frameCost)
                    }
                    lev[i] = updatedPaint
                }
            }

            state.paintingsData = lev
        },
        addToCart:(state, action) => {
            const paintingsDataClone = state.paintingsData.map(painting => ({...painting}))
            for(let i = 0; i < paintingsDataClone.length; i++){
                const item = paintingsDataClone[i]
                if(item._id === action.payload.id){
                    item.addedToCart = true
                }
            }
            state.paintingsData = paintingsDataClone
        } 
    }
})

export const {
    setSetsDataSortByCatalogs,
    setSetsDataSortBySubCatalogs, 
    setPaintingsData, 
    setPaintingDataFrame, 
    setPaintingDataPaint, 
    addToCart
} = SetsReducer.actions
export default SetsReducer.reducer