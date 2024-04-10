import axios from "axios";
const API = 'http://localhost:5050'

export const signup = async(user: any) => {
  try {

  const option = {
    headers: {
      'Content-Type': 'application/json'
    },
  };

  if(user){
    const res = await axios.post(API+ '/user/create', user, option);
  console.log(res)
  
  return res;
  }
  } catch (error) {
    
  }
}

export const login = async(user: any) => {
  try {
    
  const option = {
    headers: {
      'Content-Type': 'application/json'
    },
  };

  if(user){
    const res = await axios.post(API+ '/user/login', user, option);
  console.log(res)
 
  return res;
  }
  } catch (error) {
    
  }
}

export const verifyUser = async(data: any) => {
  try {
   const addToast = data.addToast;
   const id = data.id
  const option = {
    headers: {
      'Content-Type': 'application/json'
    },
  };

  if(id){
    const res = await axios.put(API+ `/user/verify/${id}`, option);
  console.log(res)
  addToast("Email Verification Successful", {
    appearance: "success",
    autoDismiss: true,
  });
  return res;
  }
  } catch (error) {
    
  }
}
export const sendEmailLink = async(data: any) => {
  try {
   
  const option = {
    headers: {
      'Content-Type': 'application/json'
    },
  };

  if(data){
    const res = await axios.post(API+ `/user/sendmail`, data, option);
  console.log(res)
  
  return res;
  }
  } catch (error) {
    
  }
}

export const passwordReset = async(data: any) => {
  try {
   const passwordData = data.changePassword
  const option = {
    headers: {
      'Content-Type': 'application/json'
    },
  };
  console.log('data password: ', passwordData)

  if(passwordData){
    const res = await axios.post(API+ `/user/change/password`, passwordData, option);
  console.log(res)
 
  return res;
  }
  } catch (error) {
    
  }
}