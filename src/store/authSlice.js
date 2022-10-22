import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: {},
    stateDialog: false,
    stateDialogRegister: false,
    stateDialogForgotPassword: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateUser: (state,action)=> {
            state.user = action.payload
        },
        updateStateDialog: (state,action) => {
            state.stateDialog = action.payload
        },
        updateStateDialogRegister: (state,action) => {
            state.stateDialogRegister = action.payload
        },
        updateStateDialogForgotPassword: (state,action) => {
            state.stateDialogForgotPassword = action.payload
        }
    }
})

export const {
    updateStateDialog,
    updateStateDialogRegister,
    updateStateDialogForgotPassword,
    updateUser
} = authSlice.actions

export default authSlice.reducer