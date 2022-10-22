import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    cart: {
        cart: {
            totalPrice: 0,
            userId: 0,
        },
        items: [
            
        ]
    },
    carts: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCarts: (state,action) => {
            state.carts = action.payload
        },
        updateCart: (state,action) => {
            state.cart = action.payload
        },
        addItem: (state, action) => {
            state.cart.items.push(action.payload)
        },
        updateItems: (state,action) => {
            state.cart.items = action.payload
        },
        addQuantity: (state,action) => {
            state.cart.items[action.payload].quantity = state.cart.items[action.payload].quantity+1
        },
        reduceQuantity: (state,action) => {
            state.cart.items[action.payload].quantity = state.cart.items[action.payload].quantity-1
        },
        updateTotalPrice: (state,action) => {
            state.cart.items[action.payload].total = state.cart.items[action.payload].quantity * state.cart.items[action.payload].price
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
    updateCart
} = cartSlice.actions

export default cartSlice.reducer