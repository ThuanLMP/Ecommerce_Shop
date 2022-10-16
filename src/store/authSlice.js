import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    stateDialog: false,
    stateDialogRegister: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateStateDialog: (state,action) => {
            state.stateDialog = action.payload
        },
        updateStateDialogRegister: (state,action) => {
            state.stateDialogRegister = action.payload
        },
    }
})

export const {
    updateStateDialog,
    updateStateDialogRegister
} = authSlice.actions

export default authSlice.reducer