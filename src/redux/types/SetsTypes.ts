import { Sets } from "@app/api/Types";

export interface PaintFrameTypes {
    initialCost: number
    cost: number
    size: string
    name?:string 
    src:string 
    quantity: number
}

export interface PaintingsSubItemType {
    paint: PaintFrameTypes;
    frame: PaintFrameTypes;
}

export interface PaintingsDataType extends PaintingsSubItemType {
    _id:string
    total: number
}

export interface InitialState {
    setsData: Sets[]
    setsDataLoading: boolean
    paintingsData: PaintingsDataType[]
}