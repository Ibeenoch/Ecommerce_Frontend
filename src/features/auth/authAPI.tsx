import axios from "axios";
const API = 'http://localhost:5050'

export const signup = async(users: any) => {
  try {
    const addToast = users.addToast;
    const user = users.data
  const option = {
    headers: {
      'Content-Type': 'application/json'
    },
  };

  if(user){
    const res = await axios.post(API+ '/user/create', user, option);
  console.log(res)
  addToast("Registration Successfull", {
    appearance: "success",
    autoDismiss: true,
  });
  return res;
  }
  } catch (error) {
    
  }
}