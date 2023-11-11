import { PostDataType } from "../Types"
import { post } from "../api_helper"

export const PostOrders = (data: PostDataType<string>): Promise<any> => {
    return post('api/orders', data)
}