import axios from "axios";

const API = 'http://localhost:5050/cart'

export const fetchAllUsersCart = async() => {
    try {
        const response = await JSON.parse(localStorage.getItem('cart') as any);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const addToCart = async(data: any, addToast: any) => {
    try {
        
        const checkItem = await JSON.parse(localStorage.getItem('cart') as any);
        console.log('check item cart: ', checkItem)
        if(checkItem === null || checkItem.length < 1 ){
            console.log('newly added')
            let checkItem =[];
            checkItem.push(data);
            localStorage.setItem('cart', JSON.stringify(checkItem));
            addToast('product successfully added to cart', {
                appearance: 'success',
                autoDismiss: true,
              })
        }else{
            console.log('already exist')
                //check if its the same product, if true don't add it
               
            const index = checkItem.find((item: any) => item.id === data.id)

            console.log('indexes: ', index)
            if(!index){
                checkItem.push(data);
                localStorage.setItem('cart', JSON.stringify(checkItem));
                addToast('product successfully added to cart', {
                    appearance: 'success',
                    autoDismiss: true,
                  })
            }else{
                addToast('The product already exist in the cart', {
                    appearance: 'error',
                    autoDismiss: true,
                  })
                return;
            }
                                   
        }
        const response = await JSON.parse(localStorage.getItem('cart') as any);
        console.log('add to cart response: ',response)
        return response
    } catch (error) {
        console.log(error);
    }
}

export const updateCartQty = async(id: any, data: any) => {
    try {
      
        const checkItem = JSON.parse(localStorage.getItem('cart') as any);
        const getIndex = checkItem.find((item: any) => item.id === id);
        checkItem[getIndex].quantity = data;
        const response = JSON.parse(localStorage.getItem('cart') as any);
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);
    }
}

