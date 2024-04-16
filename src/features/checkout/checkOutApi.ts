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

export const fetchAUserTransactions = async (id: any) => {
  try {
    const option = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(API + `/transactions/${id}`);
    console.log("a user transactions ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTransactions = async (token: any) => {
  try {
    const option = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(API + `/transactions`, option);
    console.log("all transactions ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTransaction = async (data: any) => {
  try {
    const token = data.token;
    const id = data.id;
    const option = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    };

    const res = await axios.delete(API + `/transaction/${id}`, option);
    console.log("deleted transactions ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};


export const fetchpaymentPagination = async (data: any) => {
  try {
    const token = data.token;
    const item = data.item;
    
    const option = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };

    const res = await axios.post(API + `/payment/paginate`, item, option);
    console.log("payment pagination api ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};