import axios from "axios";
const API = 'http://localhost:5050'

export const fetchAllOrder = async (token: any) => {
    try {
        console.log('tokenget: ', token)
      const option = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      };
  
      const res = await axios.get(API + `/orders`, option);
      console.log("all user orders ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateAnOrder = async (data: any) => {
    try {
      const token = data.token;
      const id = data.id;
      const status = data.status;
      const option = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      };
  
      const res = await axios.put(API + `/order/${id}`, status, option);
      console.log("update a user order ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };