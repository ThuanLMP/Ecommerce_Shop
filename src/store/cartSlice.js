import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import cartApi from "../api/cartApi"


const initialState = {
    cart: {
        cart: {
            totalPrice: 0,
            userId: 0,
        },
        items: [

        ]
    },
    carts: [],
    stateAddItem: false,
    stateDeleteItem: false,
    quantityProductAdd: 1
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCarts: (state, action) => {
            state.carts = action.payload
        },
        updateCart: (state, action) => {
            state.cart = action.payload
        },
        addItem: (state, action) => {
            state.cart.items.push(action.payload)
        },
        updateItems: (state, action) => {
            state.cart.items = action.payload
        },
        addQuantity: (state, action) => {
            state.cart.items[action.payload].quantity = state.cart.items[action.payload].quantity + 1
        },
        reduceQuantity: (state, action) => {
            state.cart.items[action.payload].quantity = state.cart.items[action.payload].quantity - 1
        },
        updateTotalPrice: (state, action) => {
            state.cart.items[action.payload].total = state.cart.items[action.payload].quantity * state.cart.items[action.payload].price
        },
        updateStateAddItem: (state, action) => {
            state.stateAddItem = action.payload
        },
        updateQuantity: (state, action) => {
            state.quantityProductAdd = action.payload
        },
        updateStateDeleteItem: (state,action) => {
            state.stateDeleteItem = action.payload
        }
    }
  

})


export const {
    addItem,
    updateItems,
    addQuantity,
    updateTotalPrice,
    reduceQuantity,
    updateCarts,
    updateCart,
    updateStateAddItem,
    updateQuantity,
    updateStateDeleteItem
} = cartSlice.actions

export default cartSlice.reducer