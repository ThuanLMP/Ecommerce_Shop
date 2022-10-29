import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    product: {},
    user: {}
}

export const managementSlice = createSlice({
    name: 'management',
    initialState,
    reducers: {
        updateProduct: (state, action) => {
            state.product = action.payload
        },
        updateUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const {
    updateProduct,
    updateUser
} = managementSlice.actions

export default managementSlice.reducer