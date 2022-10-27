import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    product: {},
}

export const managementSlice = createSlice({
    name: 'management',
    initialState,
    reducers: {
        updateProduct: (state, action) => {
            state.product = action.payload
        }
    }
})

export const {

} = managementSlice.actions

export default managementSlice.reducer