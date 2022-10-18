import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    category: '',
    product: {},
    reviews: {
        total: 0,
        result: [],
        totalPage: 0,
        currentPage: 0
    },
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        updateCategory: (state, action) => {
            state.category = action.payload
        },
        updateProduct: (state, action) => {
            state.product = action.payload
        },
        updateReviews: (state, action) => {
            state.reviews = action.payload
        },
        addReview: (state,action) => {
            state.reviews.result.push(action.payload)
            state.reviews.total = state.reviews.total+1
        } 
    }
})

export const {
    updateCategory,
    updateProduct,
    updateReviews,
    addReview
} = productsSlice.actions

export default productsSlice.reducer