import axios from "axios";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../auth/authSlice";

const API = "http://localhost:5050";

export const createProduct = async (products: any) => {
  try {
    const token = products.token;
    const product = products.product;
    const option = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    if (product) {
      const res = await axios.post(API + "/product/create", product, option);
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const option = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await axios.get(API + "/products");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAProductReview = async (id: any) => {
  try {
    const option = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(API + `/reviews/product/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getSimilarProduct = async (data: any) => {
  try {
    const category = data.category;
    const brand = data.brand;
    const option = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(
      API + `/similar/product?q=${category}&m=${brand}`,
      option
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addProductReview = async (data: any) => {
  try {
    const option = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(API + `/review/product/create`, data, option);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const searchProducts = async (searchKey: any) => {
  try {
    const option = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(API + `/search/product?q=${searchKey}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getProduct = async (id: any) => {
  try {
    const option = {
      headers: {
        Accept: "application/json",
      },
    };
    const res = await axios.get(`${API}/product/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (product: any) => {
  try {
    const productId = product.productId;
    const token = product.token;

    if (productId) {
      const option = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.delete(
        `${API}/product/delete/${productId}`,
        option
      );
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (products: any) => {
  try {
    const productId = products.id;
    const product = products.product;
    const images = products.images;
    const token = products.token;

    if (product && images) {
      const option = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      if (productId && product && token) {
        const res = await axios.put(
          `${API}/product/update/${productId}`,
          product,
          option
        );
        return res;
      }
    } else {
      const option = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      if (productId && product) {
        const res = await axios.put(
          `${API}/product/update/${productId}`,
          product,
          option
        );
        return res;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const sortProductInAsc = async () => {
  try {
    const res = await axios.get(API + "/sort/product/asc");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const sortProductInDesc = async () => {
  try {
    const res = await axios.get(API + "/sort/product/desc");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const sortProductInLatest = async () => {
  try {
    const res = await axios.get(API + "/sort/product/latest");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const sortProductInRated = async () => {
  try {
    const res = await axios.get(API + "/sort/product/rating");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async () => {
  try {
    const res = await axios.get(API + "/categories");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getACategory = async (name: any) => {
  try {
    const res = await axios.get(API + `/category/${name}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBrands = async () => {
  try {
    const res = await axios.get(API + "/brands");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getABrand = async (name: any) => {
  try {
    const res = await axios.get(API + `/brand/${name}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateproductReview = async (data: any) => {
  try {
    const id = data.id;
    const updatedRating = { updatedRating: data.updatedRating };

    const res = await axios.put(API + `/similar/product/${id}`, updatedRating);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPagination = async (data: any) => {
  try {
    const res = await axios.post(API + `/product/paginate`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
