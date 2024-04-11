import axios from "axios";

const API = 'http://localhost:5050'

export const addAddress = async(data: any) => {
    try {
        const option = {
            headers: {
              'Content-Type': 'application/json'
            },
          };
        const response = await axios.post(API+'/checkout/info', data);        
        return response
    } catch (error) {
        console.log(error);
    }
}

export const sendTransaction = async(data: any) => {
    try {
        const option = {
            headers: {
              'Content-Type': 'application/json'
            },
          };
        const response = await axios.post(API+'/checkout/transaction', data); 
        console.log('payment recorded' ,response)       
        return response
    } catch (error) {
        console.log(error);
    }
}

