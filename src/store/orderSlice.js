import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    dataOrder: {
        order: {
            paymentMethod: 'Paypal',
            address: 'Đại học FPT',
            contact: '0388684080',
            totalPrice: 0,
            userId: 0
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
        },
        updateTotalPrice: (state,action) => {
            state.dataOrder.order.totalPrice = action.payload
        },
        setUserId: (state,action)=>{
            state.dataOrder.order.userId = action.payload
        }

    }
})

export const {
    updateOrder,
    updateMethodPayment,
    updateItemArr,
    updateTotalPrice,
    setUserId
} = orderSlice.actions

export default orderSlice.reducer