import axios from "axios";

const Axios = axios.create({
  baseURL: "https://fiix-app.herokuapp.com"
});

export const userLogin = (email, password) => {
  return Axios.post("/users/user/login", { email, password });
};
