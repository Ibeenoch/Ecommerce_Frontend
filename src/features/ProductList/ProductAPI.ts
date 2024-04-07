import axios from "axios";

const API = 'http://localhost:5050'
// create product
// export const createProduct = async(product: FormData) => {
// try {
//   const option = {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json'
//     },
//     body: product
//   }
//   const response = await fetch(API+ '/product/create', option);
//   const data = await response.json();
//   console.log(data)
//   return data;
// } catch (error) {
//   console.log(error)
// }
// }

export const createProduct = async(product: any) => {
try {
  console.log(product)
  const option = {
    headers: {
      'Content-Type': 'multipart/form-data'
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
  console.log(res)
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

export const deleteProduct = async(productId: any) => {
  try {
    console.log(productId)
    if(productId){
      const res = await axios.delete(`${API}/product/delete/${productId}`);
    console.log(res)
    return res;
    }
    
  } catch (error) {
    console.log(error)
  }
  }

export const updateProduct = async(productId: any, product: any) => {
  try {
    if(product && product.fileupload){
        const option = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        };
      
        if(productId && product){
          const res = await axios.put(`${API}/product/update/${productId}`, product, option);
        console.log(res)
        return res;
        }
    }else{
        const option = {
        headers: {
          'Content-Type': 'application/json'
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