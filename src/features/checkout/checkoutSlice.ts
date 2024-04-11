import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import * as api from './checkOutApi'

interface CheckOut{
    checkoutInfo: any;
    latestTransaction: any
    allTransactions: any
    status: 'success' | 'loading' | 'failed' | 'idle';
}

const initialState: CheckOut = {
    checkoutInfo: [],
    latestTransaction: [],
    allTransactions: [],
    status: 'idle',
}

export const createAddress = createAsyncThunk('checkout/add', async(data: any) => {
    try {
        const res = await api.addAddress(data);
        return res?.data
    } catch (error) {
        
    }
})

export const transactionmade = createAsyncThunk('checkout/transaction', async(data: any) => {
    try {
        const res = await api.sendTransaction(data);
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
           if(Array.isArray(state.checkoutInfo)){
                state.checkoutInfo.push(action.payload)
           }else{
            state.checkoutInfo = [action.payload]
           }
        })
        .addCase(createAddress.rejected, (state, action) => {
            state.status = 'failed'
        })
        .addCase(transactionmade.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(transactionmade.fulfilled, (state, action) => {
            state.status = 'success'     
            console.log('transaction fulfilled: ', JSON.parse(JSON.stringify(action.payload)))

                state.latestTransaction = JSON.parse(JSON.stringify(action.payload))
  
        })
        .addCase(transactionmade.rejected, (state, action) => {
            state.status = 'failed'
        })
        
    }
})

export const selectCheckout = (state: RootState) => state.checkout;
export default checkoutSlice.reducer;
