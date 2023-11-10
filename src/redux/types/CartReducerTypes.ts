import { PaintingsDataType } from "./SetsTypes";

export type KeyTypes = 'frame' | 'paint'

export interface InitialState {
    cartData: PaintingsDataType[]
}