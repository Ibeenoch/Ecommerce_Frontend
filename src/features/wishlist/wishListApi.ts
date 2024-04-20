import axios from "axios";

// const API = 'http://localhost:5050/cart'

export const fetchAllUsersWishList = async () => {
  try {
    const response = await JSON.parse(localStorage.getItem("wishlist") as any);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addToWishList = async (data: any, addToast: any) => {
  try {
    const checkItem = await JSON.parse(localStorage.getItem("wishlist") as any);
    if (checkItem === null || checkItem.length < 1) {
      let checkItem = [];
      checkItem.push(data);
      localStorage.setItem("wishlist", JSON.stringify(checkItem));
      addToast("product successfully added to wishlist", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      //check if its the same product, if true don't add it
      const index = checkItem.find((item: any) => item.id === data.id);
      if (!index) {
        checkItem.push(data);
        localStorage.setItem("wishlist", JSON.stringify(checkItem));
        addToast("product successfully added to wishlist", {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        addToast("The product already exist in the wishlist", {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }
    }
    const response = await JSON.parse(localStorage.getItem("wishlist") as any);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateWishListQty = async (id: any, data: any) => {
  try {
    const checkItem = JSON.parse(localStorage.getItem("wishlist") as any);
    const getIndex = checkItem.find((item: any) => item.id === id);
    checkItem[getIndex].quantity = data;
    const response = JSON.parse(localStorage.getItem("wishlist") as any);
    return response;
  } catch (error) {
    console.log(error);
  }
};
