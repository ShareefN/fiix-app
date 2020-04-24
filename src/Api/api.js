import axios from "axios";

const Axios = axios.create({
  baseURL: "https://fiix-app.herokuapp.com"
});

export const userLogin = (email, password) => {
  return Axios.post("/users/user/login", { email, password });
};

export const userRegister = (username, email, number, password) => {
  return Axios.post("/users/user/register", {
    username,
    email,
    number,
    password
  });
};

export const contractorLogin = (email, password) => {
  return Axios.post("/contractors/contractor/login", { email, password });
};
