import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    dataOrder: {
        order: {
            paymentMethod: 'Paypal',
            address: 'Đại học FPT',
            contact: '0388684080',
            totalPrice: 0,
            userId: JSON.parse(localStorage.getItem('user')).id
        },
        itemArr: []
    }
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        updateOrder: (state, action) => {
            state.dataOrder.order = action.payload
        },
        updateMethodPayment: (state,action) => {
            state.dataOrder.order.paymentMethod = action.payload
        },
        updateItemArr: (state,action) => {
            state.dataOrder.itemArr = action.payload
        }

    }
})

export const {
    updateOrder,
    updateMethodPayment,
    updateItemArr
} = orderSlice.actions

export default orderSlice.reducer