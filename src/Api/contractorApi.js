import axios from "axios";
import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";

var Axios = null;

const initAxios = () => {
  RNSecureKeyStore.get("contractor_token")
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

export const storeContractorToken = async token => {
  await RNSecureKeyStore.set("contractor_token", token, {
    accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY
  })
    .then(res => initAxios())
    .catch(err => console.log(err));
};

export const storeContractorCredentials = async (id, name, category) => {
  await RNSecureKeyStore.set("contractor_id", id.toString(), {
    accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY
  });
  await RNSecureKeyStore.set("contractor_name", name, {
    accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY
  });
  await RNSecureKeyStore.set("category", category, {
    accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY
  });
};

export const contractorLogin = (email, password) => {
  return Axios.post("/contractors/contractor/login", { email, password });
};

export const contractorLogout = async () => {
  await RNSecureKeyStore.remove("contractor_token");
  await RNSecureKeyStore.remove("contractor_name");
  await RNSecureKeyStore.remove("contractor_id");
  await RNSecureKeyStore.remove("category");
};

export const getContractor = contractorId => {
  return Axios.get(`/contractors/contractor/${contractorId}`);
};

export const getContractorReviews = contractorId => {
  return Axios.get(`/contractors/contractor/${contractorId}/reviews`);
};

export const updateBio = (contractorId, bio) => {
  return Axios.put(`/contractors/contractor/${contractorId}/bio`, { bio });
};

export const getContractors = (category, contractorId) => {
  return Axios.get(`/contractors/${category}/${contractorId}`)
}