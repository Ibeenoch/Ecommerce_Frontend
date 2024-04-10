import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import * as api from './checkOutApi'

interface CheckOut{
    checkoutInfo: any;
    status: 'success' | 'loading' | 'failed' | 'idle';
}

const initialState: CheckOut = {
    checkoutInfo: [],
    status: 'idle',
}

export const createAddress = createAsyncThunk('checkout/add', async(data: any) => {
    try {
        const res = await api.addAddress(data)
        return res?.data
    } catch (error) {
        
    }
})

export const checkoutSlice = createSlice({
    name: 'checkOut',
    initialState,
    reducers: {

    },
    extraReducers(builder){
        builder
        .addCase(createAddress.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(createAddress.fulfilled, (state, action) => {
            state.status = 'success'
            state.checkoutInfo = action.payload
        })
        .addCase(createAddress.rejected, (state, action) => {
            state.status = 'failed'
        })
        
    }
})

export const selectCheckout = (state: RootState) => state.product;
export default checkoutSlice.reducer;
