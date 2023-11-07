import { Sets } from "@app/api/Types";

interface PrintSizePostType {
    _id:string 
    prSize:string 
    priceCost:string 
    createdDate: Date
    __v: number   
}

type PaintingsDataType = {
    _id:string
    total: number 
    addedToCart: boolean
    paint: {
        cost: number
        size: string
        name?:string 
        src:string 
    }, 
    frame: {
        size:string
        cost:number 
        name?:string
        src?: string 
    }
}[]

export interface InitialState {
    setsData: Sets[]
    setsDataLoading: boolean
    paintingsData: PaintingsDataType
}