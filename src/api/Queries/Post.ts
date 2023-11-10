import { PostDataType } from "../Types"
import { post } from "../api_helper"

export const PostOrders = (data: PostDataType<string>) => {
    return post('api/orders', data)
}