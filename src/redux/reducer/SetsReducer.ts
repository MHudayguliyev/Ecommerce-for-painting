import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  Sets } from '@app/api/Types';
import { InitialState } from '../types/SetsTypes';
import { updatePainting } from '@utils/helpers';

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
            state.paintingsData = [...updatePainting({
                data: state.paintingsData, 
                actionPayload: action.payload, 
                key: 'frame' // the name of object key inside paintingsData. If anonymous, do this in jsx(console.log("paintingsData'"))
            })]
        }, 
        setPaintingDataPaint: (state, action) => {
            state.paintingsData = [...updatePainting({
                data: state.paintingsData, 
                actionPayload: action.payload, 
                key: 'paint'
            })]
        }
    }
})

export const {
    setSetsDataSortByCatalogs,
    setSetsDataSortBySubCatalogs, 
    setPaintingsData, 
    setPaintingDataFrame, 
    setPaintingDataPaint, 
} = SetsReducer.actions
export default SetsReducer.reducer