import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store'; 
import * as api from './ProductAPI';
import { act } from '@testing-library/react';


export interface ProductState {
  status: 'success' | 'loading' | 'failed' | 'idle';
  products: any,
  product: any,
  productReview: any,
  brands: any,
  brand: any,
  categories: any,
  category: any,
  message: any;
}

const initialState: ProductState = {
  status: 'idle',
  products: [],
  product: [],
  productReview: [],
  brands: [],
  brand: [],
  categories: [],
  category: [],
  message: ''
};


export const updateproduct = createAsyncThunk('product/update', async(products: any, thunkAPI) => {
  try {
    const res = await api.updateProduct(products);
      return res?.data;
    
  } catch (error) {
    const message = thunkAPI.rejectWithValue(error);
    return message;
  }
})

export const deleteproduct = createAsyncThunk('product/delete', async(id: any, thunkAPI) => {
  try {
    const res = await api.deleteProduct(id);
      return res?.data;
    
  } catch (error) {
    const message = thunkAPI.rejectWithValue(error);
    return message;
  }
})

export const createproduct = createAsyncThunk('product/create', async(product: any, thunkAPI) => {
  try {
    const res = await api.createProduct(product);
      return res?.data;
    
  } catch (error) {
    const message = thunkAPI.rejectWithValue(error);
    return message;
  }
})

export const getAllproduct = createAsyncThunk('product/getProducts', async(_, thunkAPI) => {
  try {
    const res = await api.getProducts();
    return res?.data;
  } catch (error) {
    const message = thunkAPI.rejectWithValue(error);
    return message;
  }
})

export const sortproductAsc = createAsyncThunk('product/getsortProductAsc', async(_, thunkAPI) => {
  try {
    const res = await api.sortProductInAsc();
    return res?.data;
  } catch (error) {
    const message = thunkAPI.rejectWithValue(error);
    return message;
  }
})


export const getAproduct = createAsyncThunk('product/getProduct', async(id: any, thunkAPI) => {
  try {
    const res = await api.getProduct(id);
    return res?.data;
  } catch (error) {
    const message = thunkAPI.rejectWithValue(error);
    return message;
  }
})

export const sortproductDesc = createAsyncThunk('product/getsortProductDesc', async(_, thunkAPI) => {
  try {
    const res = await api.sortProductInDesc();
    return res?.data;
  } catch (error) {
    const message = thunkAPI.rejectWithValue(error);
    return message;
  }
})

export const sortproductNewest = createAsyncThunk('product/getsortProductnewest', async(_, thunkAPI) => {
  try {
    const res = await api.sortProductInLatest();
    return res?.data;
  } catch (error) {
    const message = thunkAPI.rejectWithValue(error);
    return message;
  }
})

export const getPagination = createAsyncThunk('product/getPagination', async(data: any, thunkAPI) => {
  try {
    const res = await api.fetchPagination(data);
    return res?.data;
  } catch (error) {
    const message = thunkAPI.rejectWithValue(error);
    return message;
  }
})
export const sortproductRated = createAsyncThunk('product/getsortProductrated', async(_, thunkAPI) => {
  try {
    const res = await api.sortProductInRated();
    return res?.data;
  } catch (error) {
    const message = thunkAPI.rejectWithValue(error);
    return message;
  }
})

export const fetchAllCategories = createAsyncThunk('product/getAllCategories', async(_, thunkAPI) => {
  try {
    const res = await api.getAllCategories();
    return res?.data;
  } catch (error) {
    const message = thunkAPI.rejectWithValue(error);
    return message;
  }
})

export const getACategory = createAsyncThunk('product/getACategory', async(name: string, thunkAPI) => {
  try {
    const res = await api.getACategory(name);
    return res?.data;
  } catch (error) {
    const message = thunkAPI.rejectWithValue(error);
    return message;
  }
})
export const getProductSearchResult = createAsyncThunk('product/search', async(name: string, thunkAPI) => {
  try {
    const res = await api.searchProducts(name);
    return res?.data;
  } catch (error) {
    const message = thunkAPI.rejectWithValue(error);
    return message;
  }
})

export const fetchAllBrands = createAsyncThunk('product/getAllBrands', async(_, thunkAPI) => {
  try {
    const res = await api.getAllBrands();
    return res?.data;
  } catch (error) {
    const message = thunkAPI.rejectWithValue(error);
    return message;
  }
})

export const getallProductReviews = createAsyncThunk('product/getAllProductReviews', async(_, thunkAPI) => {
  try {
    const res = await api.getAllProductReview();
    return res?.data;
  } catch (error) {
    const message = thunkAPI.rejectWithValue(error);
    return message;
  }
})

export const fetchABrand = createAsyncThunk('product/getABrand', async(name: string, thunkAPI) => {
  try {
    const res = await api.getABrand(name);
    return res?.data;
  } catch (error) {
    const message = thunkAPI.rejectWithValue(error);
    return message;
  }
})

export const createAProductReview = createAsyncThunk('product/reviewcreate', async(data: any, thunkAPI) => {
  try {
    const res = await api.addProductReview(data);
    return res?.data;
  } catch (error) {
    const message = thunkAPI.rejectWithValue(error);
    return message;
  }
})

export const productSlice = createSlice({
  name: 'productList',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
   
    
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers(builder) {
    builder.
    addCase(createproduct.pending, (state, action) => {
      state.status = 'loading'
    })
    .
    addCase(createproduct.fulfilled, (state, action) => {
      state.status = 'success'
      state.products.push(action.payload)
    })
    .
    addCase(createproduct.rejected, (state, action) => {
      state.status = 'failed'
      state.message = action.payload
    })
    .addCase(getAllproduct.pending, (state, action) => {
      state.status = 'loading'
    })
    .
    addCase(getAllproduct.fulfilled, (state, action) => {
      state.status = 'success'
      state.products = action.payload;
      console.log('state of the product: ', state.products, 'action: ', action.payload)
    })
    .
    addCase(getAllproduct.rejected, (state, action) => {
      state.status = 'failed'
      state.message = action.payload
    })
    .addCase(getAproduct.pending, (state, action) => {
      state.status = 'loading'
    })
    .
    addCase(getAproduct.fulfilled, (state, action) => {
      state.status = 'success'
      state.product = action.payload;
    })
    .
    addCase(getAproduct.rejected, (state, action) => {
      state.status = 'failed'
      state.message = action.payload
    })
    .addCase(updateproduct.pending, (state, action) => {
      state.status = 'loading'
    })
    .
    addCase(updateproduct.fulfilled, (state, action) => {
      state.status = 'success'
      // const index = state.products.findIndex((pro: { id: any; }) => pro.id === action.payload.id );
      const index = state.products.findIndex((pro: any) => pro.id === action.payload.id );
      console.log('index: ', index)
      state.products[index] = action.payload
      console.log('updated: ', state.products[index])
    })
    .
    addCase(updateproduct.rejected, (state, action) => {
      state.status = 'failed'
      state.message = action.payload
    })
    .addCase(deleteproduct.pending, (state, action) => {
      state.status = 'loading'
    })
    .
    addCase(deleteproduct.fulfilled, (state, action) => {
      state.status = 'success'
      state.products.filter((pro: { id: any; }) => pro.id !== action.payload.id )
    })
    .
    addCase(deleteproduct.rejected, (state, action) => {
      state.status = 'failed'
      state.message = action.payload
    })
    .addCase(sortproductAsc.pending, (state, action) => {
      state.status = 'loading'
    })
    .
    addCase(sortproductAsc.fulfilled, (state, action) => {
      state.status = 'success'
      state.products = action.payload
    })
    .
    addCase(sortproductAsc.rejected, (state, action) => {
      state.status = 'failed'
      state.message = action.payload
    })
    .addCase(sortproductDesc.pending, (state, action) => {
      state.status = 'loading'
    })
    .
    addCase(sortproductDesc.fulfilled, (state, action) => {
      state.status = 'success'
      state.products = action.payload
    })
    .
    addCase(sortproductDesc.rejected, (state, action) => {
      state.status = 'failed'
      state.message = action.payload
    })
    .addCase(sortproductNewest.pending, (state, action) => {
      state.status = 'loading'
    })
    .
    addCase(sortproductNewest.fulfilled, (state, action) => {
      state.status = 'success'
      state.products = action.payload
    })
    .
    addCase(sortproductNewest.rejected, (state, action) => {
      state.status = 'failed'
      state.message = action.payload
    })
    .addCase(sortproductRated.pending, (state, action) => {
      state.status = 'loading'
    })
    .
    addCase(sortproductRated.fulfilled, (state, action) => {
      state.status = 'success'
      state.products = action.payload
    })
    .
    addCase(sortproductRated.rejected, (state, action) => {
      state.status = 'failed'
      state.message = action.payload
    })
    .addCase(fetchAllCategories.pending, (state, action) => {
      state.status = 'loading'
    })
    .
    addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.status = 'success'
      state.categories = action.payload
      console.log('fetch categories: ', state.categories )
    })
    .
    addCase(fetchAllCategories.rejected, (state, action) => {
      state.status = 'failed'
      state.message = action.payload
    })
    .addCase(getProductSearchResult.pending, (state, action) => {
      state.status = 'loading'
    })
    .
    addCase(getProductSearchResult.fulfilled, (state, action) => {
      state.status = 'success'
      if(action.payload !== undefined || action.payload !== null){
        state.products = action.payload
        console.log('search product: ', state.products )
      }
    })
    .
    addCase(getProductSearchResult.rejected, (state, action) => {
      state.status = 'failed'
      state.message = action.payload
    })
    .addCase(getACategory.pending, (state, action) => {
      state.status = 'loading'
    })
    .
    addCase(getACategory.fulfilled, (state, action) => {
      state.status = 'success'
      state.category = action.payload;
      state.products = action.payload.products;
      console.log('fetch category: ', state.category )
    })
    .
    addCase(getACategory.rejected, (state, action) => {
       state.status = 'failed'
      state.message = action.payload
    })
    .addCase(fetchAllBrands.pending, (state, action) => {
      state.status = 'loading'
    })
    .
    addCase(fetchAllBrands.fulfilled, (state, action) => {
      state.status = 'success'
      state.brands = action.payload;
      console.log('fetch brands: ', state.brands )
    })
    .
    addCase(fetchAllBrands.rejected, (state, action) => {
      state.status = 'failed'
      state.message = action.payload
    })
    .addCase(fetchABrand.pending, (state, action) => {
      state.status = 'loading'
    })
    .
    addCase(fetchABrand.fulfilled, (state, action) => {
      state.status = 'success'
      state.brand = action.payload
      state.products = action.payload.products
      console.log('fetch brand: ', state.brand )
    })
    .
    addCase(fetchABrand.rejected, (state, action) => {
      state.status = 'failed'
      state.message = action.payload
    })
    .addCase(getPagination.pending, (state, action) => {
      state.status = 'loading'
    })
    .
    addCase(getPagination.fulfilled, (state, action) => {
      state.status = 'success'
      state.products = action.payload
      console.log('fetch pagination: ', state.products )
    })
    .
    addCase(getPagination.rejected, (state, action) => {
      state.status = 'failed'
      state.message = action.payload
    })
    .addCase(createAProductReview.pending, (state, action) => {
      state.status = 'loading'
    })
    .
    addCase(createAProductReview.fulfilled, (state, action) => {
      state.status = 'success'
      if(action.payload !== undefined){
        state.productReview = action.payload
      console.log('created review: ', action.payload)
      }
      
    })
    .
    addCase(createAProductReview.rejected, (state, action) => {
      state.status = 'failed'
      state.message = action.payload
    })
    .addCase(getallProductReviews.pending, (state, action) => {
      state.status = 'loading'
    })
    .
    addCase(getallProductReviews.fulfilled, (state, action) => {
      state.status = 'success'
      if(action.payload !== undefined){
        state.productReview = action.payload
      console.log('created review: ', state.productReview )
      }
      
    })
    .
    addCase(getallProductReviews.rejected, (state, action) => {
      state.status = 'failed'
      state.message = action.payload
    })
    
  },
});

export const {  } = productSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectProduct = (state: RootState) => state.product;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default productSlice.reducer;
