import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import * as api from './checkOutApi'

interface CheckOut{
    checkoutInfo: any;
    latestTransaction: any
    allTransactions: any
    aUserTransactions: any
    aUserOrderedProducts: any
    aUserPayment: any
    aUserShippingAddress: any
    status: 'success' | 'loading' | 'failed' | 'idle';
}

const initialState: CheckOut = {
    checkoutInfo: [],
    latestTransaction: [],
    allTransactions: [],
    aUserTransactions: [],
    aUserOrderedProducts: [],
    aUserShippingAddress: [],
    aUserPayment: {},
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

export const alltransactions = createAsyncThunk('checkout/alltransaction', async(token: any) => {
    try {
        const res = await api.fetchTransactions(token);
        return res?.data
    } catch (error) {
        
    }
})

export const deleteATransaction = createAsyncThunk('checkout/deletetransaction', async(data: any) => {
    try {
        const res = await api.deleteTransaction(data);
        return res?.data
    } catch (error) {
        
    }
})

export const getpaymentPagination = createAsyncThunk('checkout/paginate', async(data: any) => {
    try {
        const res = await api.fetchpaymentPagination(data);
        return res?.data
    } catch (error) {
        
    }
})


export const getAUserTransaction = createAsyncThunk('/user/getAUserTransactions', async(id: any) => {
    try {
  
      const res =  await api.fetchAUserTransactions(id);
      return res?.data
    } catch (error) {
      console.log(error)
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
          state.latestTransaction = JSON.parse(JSON.stringify(action.payload))
        })
        .addCase(transactionmade.rejected, (state, action) => {
            state.status = 'failed'
        })
        .addCase(deleteATransaction.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(deleteATransaction.fulfilled, (state, action) => {
            state.status = 'success'     
           const findIndex =  state.allTransactions.find((item: any) => item.id === action.payload.id)
            state.allTransactions.splice(findIndex, 1)
        })
        .addCase(deleteATransaction.rejected, (state, action) => {
            state.status = 'failed'
        })
        .addCase(alltransactions.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(alltransactions.fulfilled, (state, action) => {
            state.status = 'success'  
            if(action.payload !== undefined){
               state.allTransactions = action.payload
            console.log('all transcation', action.payload) 
            }             
        })
        .addCase(alltransactions.rejected, (state, action) => {
            state.status = 'failed'
        })
        .addCase(getpaymentPagination.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getpaymentPagination.fulfilled, (state, action) => {
            state.status = 'success'  
            if(action.payload !== undefined){
               state.allTransactions = action.payload
            console.log('all transcation', action.payload) 
            }             
        })
        .addCase(getpaymentPagination.rejected, (state, action) => {
            state.status = 'failed'
        })
        .addCase(getAUserTransaction.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(getAUserTransaction.fulfilled, (state, action) => {
            state.status = 'success'
            console.log('a user transact: ', action.payload)
            state.aUserTransactions = action.payload
            action.payload && Array.isArray(action.payload) && action.payload.forEach((elem) => {
               state.aUserOrderedProducts = elem && elem.order && elem.order.productDetails;
               state.aUserShippingAddress = elem && elem.order && elem.order.shippingDetails;
            })

            console.log('all good: ', state.aUserOrderedProducts, state.aUserShippingAddress)
          })
          .addCase(getAUserTransaction.rejected, (state, action) => {
            state.status = 'failed'
          })
        
    }
})

export const selectCheckout = (state: RootState) => state.checkout;
export default checkoutSlice.reducer;
