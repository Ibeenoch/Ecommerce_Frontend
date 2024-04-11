import axios from "axios";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../auth/authSlice";

const API = 'http://localhost:5050'



export const createProduct = async(products: any) => {
try {
  const token = products.token;
  const product = products.product;
  console.log(product, token)
  const option = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  };

  if(product){
    const res = await axios.post(API+ '/product/create', product, option);
  console.log(res)
  return res;
  }
  
} catch (error) {
  console.log(error)
}
}
export const getProducts = async() => {
try {
  const option = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  }
    const res = await axios.get(API+ '/products');
  // console.log('all products: ',res)
  return res;
  
} catch (error) {
  console.log(error)
}
}
export const getProduct = async(id: any) => {
try {
  const option = {
    headers: {
      'Accept': 'application/json'
    },
  }
    const res = await axios.get(`${API}/product/${id}`);
  return res;
  
} catch (error) {
  console.log(error)
}
}

export const deleteProduct = async(product: any) => {
  try {
    const productId = product.productId;
    const token = product.token;
    
    if(productId){
      console.log('api delete ', product)
      const option = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      };

      const res = await axios.delete(`${API}/product/delete/${productId}`, option);
    console.log(res)
    return res;
    }
    
  } catch (error) {
    console.log(error)
  }
  }

export const updateProduct = async(products: any) => {
  try {
    
    const productId = products.id;
    const product = products.product;
    const  images= products.images
    const token = products.token;

    console.log('product sending; ', product, product.images)
    if(product && images){
      console.log('with img: ', productId, product, token);
      const option = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      };
      
        if(productId && product && token){
          const res = await axios.put(`${API}/product/update/${productId}`, product, option);
        console.log('server res: ',  res)
        return res;
        }
    }else{
      console.log('no img: ', productId, product, token)
        const option = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };
    
      if(productId && product){
        const res = await axios.put(`${API}/product/update/${productId}`, product, option);
      console.log(res)
      return res;
      }
    }
   
    
  } catch (error) {
    console.log(error)
  }
  }

export const sortProductInAsc = async() => {
  try {
     const res = await axios.get(API+ '/sort/product/asc');
    console.log(res)
    return res;
    
  } catch (error) {
    console.log(error)
  }
  }

export const sortProductInDesc = async() => {
  try {
     const res = await axios.get(API+ '/sort/product/desc');
    console.log(res)
    return res;
    
  } catch (error) {
    console.log(error)
  }
  }

export const sortProductInLatest = async() => {
  try {
     const res = await axios.get(API+ '/sort/product/latest');
    console.log(res)
    return res;
    
  } catch (error) {
    console.log(error)
  }
  }

export const sortProductInRated = async() => {
  try {
     const res = await axios.get(API+ '/sort/product/rating');
    console.log(res)
    return res;
    
  } catch (error) {
    console.log(error)
  }
  }

export const getAllCategories = async() => {
  try {
     const res = await axios.get(API+ '/categories');
    console.log('categories fetch' ,res)
    return res;
    
  } catch (error) {
    console.log(error)
  }
  }

export const getACategory = async(name: any) => {
  try {
     const res = await axios.get(API+ `/category/${name}`);
    console.log(res)
    return res;
    
  } catch (error) {
    console.log(error)
  }
  }

export const getAllBrands = async() => {
  try {
     const res = await axios.get(API+ '/brands');
    console.log(res)
    return res;
    
  } catch (error) {
    console.log(error)
  }
  }

export const getABrand = async(name: any) => {
  try {
     const res = await axios.get(API+ `/brand/${name}`);
    console.log('brand api ',res)
    return res;
    
  } catch (error) {
    console.log(error)
  }
  }