const API = 'http://localhost:8080/cart'

export const fetchAllUsersCart = async() => {
    try {
        const response = await fetch(API);
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error);
    }
}

