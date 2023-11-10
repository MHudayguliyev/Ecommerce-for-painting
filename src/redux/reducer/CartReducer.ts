import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState, KeyTypes } from '../types/CartReducerTypes';
import { updatePainting } from '@utils/helpers';

const initialState: InitialState = {
    cartData: []
}

const CartReducer = createSlice({
    name: 'cart', 
    initialState: initialState, 
    reducers: {
        setCartData: (state, action) => {
            const found = state.cartData.find(item => item._id === action.payload._id)
            if(!found)
                state.cartData = [...state.cartData, action.payload]
        }, 
        updateCartDataFrame: (state, action) => {
            state.cartData = [...updatePainting({
                data: state.cartData, 
                actionPayload: action.payload, 
                key: 'frame'
            })]
        }, 
        updateCartDataPaint: (state, action) => {
            state.cartData = [...updatePainting({
                data: state.cartData, 
                actionPayload: action.payload, 
                key: 'paint'
            })]
        }, 
        increaseQuantity: (state, action) => {
            const {key, id, initialCost}: {key: KeyTypes, id:string, initialCost: number} = action.payload
            const cartDataClone = state.cartData.map(value => ({...value}))
            const index = state.cartData.findIndex(data => data._id === id)
            cartDataClone[index][key].quantity += 1
            cartDataClone[index][key].cost += initialCost
            if(!cartDataClone[index].paint && cartDataClone[index].frame)
                cartDataClone[index].total = Number(cartDataClone[index].frame.cost)
            else if(!cartDataClone[index].frame && cartDataClone[index].paint)
                cartDataClone[index].total = Number(cartDataClone[index].paint.cost)
            else 
                cartDataClone[index].total = Number(cartDataClone[index].paint.cost + cartDataClone[index].frame.cost)
            state.cartData = [...cartDataClone]
        }, 
        descreaseQuantity: (state, action) => {
            const {key, id, initialCost}: {key: KeyTypes, id:string, initialCost: number} = action.payload
            const cartDataClone = state.cartData.map(value => ({...value}))
            const index = state.cartData.findIndex(data => data._id === id)
            cartDataClone[index][key].quantity -= 1
            cartDataClone[index][key].cost -= initialCost
            if(!cartDataClone[index].paint && cartDataClone[index].frame)
                cartDataClone[index].total = Number(cartDataClone[index].frame.cost)
            else if(!cartDataClone[index].frame && cartDataClone[index].paint)
                cartDataClone[index].total = Number(cartDataClone[index].paint.cost)
            else 
                cartDataClone[index].total = Number(cartDataClone[index].paint.cost + cartDataClone[index].frame.cost)
            state.cartData = [...cartDataClone]
        }, 
        deleteCartItem: (state, action) => {
            const {id, key}: {id:string, key: KeyTypes} = action.payload
            let cartDataClone = state.cartData.map(value => ({...value}))
            const itemIndex = state.cartData.findIndex(item => item._id === id)
            delete cartDataClone[itemIndex][key]  /// this key is the one that gets deleted

            if(!cartDataClone[itemIndex].frame && !cartDataClone[itemIndex].paint){
                // console.log("geldi sutak")
                cartDataClone = [...cartDataClone.filter((item) => item._id !== id)]
                // console.log('clone', cartDataClone)
            }else cartDataClone[itemIndex].total = cartDataClone[itemIndex][key==='paint' ? 'frame' : 'paint'].cost 
                
            state.cartData = [...cartDataClone]
        }   
    }
})

export const {
    setCartData, 
    updateCartDataFrame, 
    updateCartDataPaint, 
    increaseQuantity, 
    descreaseQuantity, 
    deleteCartItem
} = CartReducer.actions
export default CartReducer.reducer