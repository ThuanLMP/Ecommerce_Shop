import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    cart: {
        cart: {
            totalPrice: 0,
            userId: 0,
        },
        itemArr: [
            
        ]
    }
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.cart.itemArr.push(action.payload)
        },
        updateItemArr: (state,action) => {
            state.cart.itemArr = action.payload
        },
        addQuantity: (state,action) => {
            state.cart.itemArr[action.payload].quantity = state.cart.itemArr[action.payload].quantity+1
        },
        reduceQuantity: (state,action) => {
            state.cart.itemArr[action.payload].quantity = state.cart.itemArr[action.payload].quantity-1
        },
        updateTotalPrice: (state,action) => {
            state.cart.itemArr[action.payload].total = state.cart.itemArr[action.payload].quantity * state.cart.itemArr[action.payload].price
        }
    }
})

export const {
    addItem,
    updateItemArr,
    addQuantity,
    updateTotalPrice,
    reduceQuantity
} = cartSlice.actions

export default cartSlice.reducer