import axios from "axios";
import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";

var Axios = null;

const initAxios = () => {
  RNSecureKeyStore.get("user_token")
    .then(res => {
      token = res;
      Axios = axios.create({
        baseURL: "https://fiix-app.herokuapp.com",
        headers: {
          Authorization: token
        }
      });
    })
    .catch(err => {
      Axios = axios.create({
        baseURL: "https://fiix-app.herokuapp.com"
      });
    });
};
initAxios();

export const wake = () => {
  Axios.get("/");
};

export const storeUserToken = async token => {
  await RNSecureKeyStore.set("user_token", token, {
    accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY
  })
    .then(res => initAxios())
    .catch(err => console.log(err));
};

export const storeUserCredentials = async (username, id) => {
  await RNSecureKeyStore.set("username", username, {
    accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY
  });
  await RNSecureKeyStore.set("user_id", id.toString(), {
    accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY
  });
};

export const storeContractorToken = async token => {
  await RNSecureKeyStore.set("contractor_token", token, {
    accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY
  })
    .then(res => initAxios())
    .catch(err => console.log(err));
};

export const storeContractorCredentials = async (id, name) => {
  await RNSecureKeyStore.set("contractor_id", id.toString(), {
    accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY
  });
  await RNSecureKeyStore.set("contractor_name", name, {
    accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY
  });
};

export const userLogin = (email, password) => {
  return Axios.post("/users/user/login", { email, password });
};

export const userRegister = user => {
  return Axios.post("/users/user/register", {
    username: user.username,
    email: user.email,
    password: user.password,
    number: user.number
  });
};

export const contractorLogin = (email, password) => {
  return Axios.post("/contractors/contractor/login", { email, password });
};

export const userLogout = async () => {
  await RNSecureKeyStore.remove("user_token");
  await RNSecureKeyStore.remove("user_id");
  await RNSecureKeyStore.remove("username");
};

export const contractorLogout = async () => {
  await RNSecureKeyStore.remove("contractor_token");
  await RNSecureKeyStore.remove("contractor_name");
  await RNSecureKeyStore.remove("contractor_id");
};

export const getReviews = () => {
  return Axios.get("/users/reviews");
};

export const postReview = review => {
  RNSecureKeyStore.get("user_id")
    .then(res => {
      return Axios.post(`/users/review/user/${res}`, { review });
    })
    .catch(err => console.log(err));
};

export const deleteReview = reviewId => {
  RNSecureKeyStore.get("user_id")
    .then(res => {
      return Axios.delete(`/users/review/${reviewId}/user/${res}`);
    })
    .catch(err => console.log(err));
};

export const fetchContractors = category => {
  return Axios.get(`/users/contractors/${category}`);
};

export const getContractor = contractorId => {
  return Axios.get(`/users/contractor/${contractorId}`);
};

export const getContractorsReviews = contractorId => {
  return Axios.get(`/users/contractor/${contractorId}/reviews`);
};

export const addContractorReview = (contractorId, review) => {
  RNSecureKeyStore.get("user_id").then(res => {
    return Axios.post(`/users/contractor/${contractorId}/user/${res}/review`, {
      review
    });
  });
};

export const deleteContractorReview = reviewId => {
  RNSecureKeyStore.get("user_id")
    .then(res => {
      return Axios.delete(`/users/contractorsreview/${reviewId}/user/${res}`);
    })
    .catch(err => console.log(err));
};

export const getUser = userId => {
  return Axios.get(`/users/user/${userId}`);
};

export const updateUser = (userId, values) => {
  return Axios.put(`/users/update/user/${userId}`, {
    email: values.email,
    number: values.number,
    username: values.username
  });
};

export const userDeactivateAccount = userId => {
  return Axios.put(`/users/deactivate/user/${userId}`);
};

export const updateUserpassword = (password, newPassword) => {
  RNSecureKeyStore.get("user_id").then(res => {
    return Axios.put(`/users/update/user/password/${res}`, {
      password: password,
      newPassword: newPassword
    });
  });
};
