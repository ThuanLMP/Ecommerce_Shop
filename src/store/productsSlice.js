import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    category: '',
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        updateCategory: (state,action) => {
            state.category = action.payload
        }
    }
})

export const {
    updateCategory,
} = productsSlice.actions

export default productsSlice.reducer