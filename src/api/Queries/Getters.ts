import { Categories, Frames, Sets } from "../Types"
import { get } from "../api_helper"

export const GetCategories = async (): Promise<Categories[]> => {
    return get('api/catalogs')
}
export const GetCategory = async (catalogId: string): Promise<Categories> => {
    return get(`api/catalogs/${catalogId}`)
}
export const GetSets = async (): Promise<Sets[]> => {
    return get<Sets[]>('api/sets')
}
export const GetSet = async (setGuid: string): Promise<Sets> => {
    return get<Sets>(`api/sets/${setGuid}`)
}
export const GetFrames = async (): Promise<Frames[]> => {
    return get<Frames[]>('api/frames')
}