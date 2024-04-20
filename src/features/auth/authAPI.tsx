import axios from "axios";
const API = "http://localhost:5050";

export const signup = async (user: any) => {
  try {
    const option = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (user) {
      const res = await axios.post(API + "/user/create", user, option);

      return res;
    }
  } catch (error) {}
};

export const login = async (user: any) => {
  try {
    const option = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (user) {
      const res = await axios.post(API + "/user/login", user, option);

      return res;
    }
  } catch (error) {}
};

export const verifyUser = async (id: any) => {
  try {
    const option = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (id) {
      const res = await axios.put(API + `/user/verify/${id}`, option);
      return res;
    }
  } catch (error) {}
};
export const sendEmailLink = async (data: any) => {
  try {
    const option = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data) {
      const res = await axios.post(API + `/user/sendmail`, data, option);

      return res;
    }
  } catch (error) {}
};

export const passwordReset = async (data: any) => {
  try {
    const passwordData = data.formData;
    const id = data.id;
    const option = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (passwordData) {
      const res = await axios.put(
        API + `/user/change/password/${id}`,
        passwordData,
        option
      );
      return res;
    }
  } catch (error) {}
};

export const fetchAUser = async (data: any) => {
  try {
    console.log("data ", data);
    const id = data.id;
    const token = data.token;
    const option = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(API + `/user/${id}`, option);
    console.log("agasshhbh ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllUser = async (token: any) => {
  try {
    const option = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(API + `/users`, option);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchuserPagination = async (data: any) => {
  try {
    const token = data.token;
    const item = data.item;

    const option = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.post(API + `/user/paginate`, item, option);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteuser = async (data: any) => {
  try {
    const token = data.token;
    const id = data.id;

    const option = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.delete(API + `/user/${id}`, option);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfilePics = async (data: any) => {
  try {
    const id = data.id;
    const imagefile = data.imageForm;
    const token = data.token;
    const option = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.put(API + `/user/image/${id}`, imagefile, option);
    return res;
  } catch (error) {
    console.log(error);
  }
};
