import axios from "axios";
import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";
import moment from "moment";

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

export const updateContractor = (contractorId, values) => {
  return Axios.put(`/contractors/update/contractor/${contractorId}`, {
    bio: values.bio,
    location: values.location,
    timeIn: moment(values.timeIn).format("hh:mm A"),
    timeOut: moment(values.timeOut).format("hh:mm A")
  });
};

export const updatePassword = (contractorId, oldPassword, newPassword) => {
  return Axios.put(`/contractors/contractor/update/password/${contractorId}`, {
    password: oldPassword,
    newPassword
  });
};

export const deactivateAccount = (contractorId, password) => {
  return Axios.put(`/contractors/deactivate/contractor/${contractorId}`, {
    password
  });
};

export const getContractors = (category, contractorId) => {
  return Axios.get(`/contractors/${category}/${contractorId}`);
};

export const getCompetitor = contractorId => {
  return Axios.get(`/contractors/${contractorId}`);
};

export const postReminder = (type, typeId, reminder) => {
  return Axios.post(`/reminders/reminder/${type}/${typeId}`, { reminder });
};

export const updateReminder = (type, typeId, reminderId, status) => {
  return Axios.put(
    `/reminders/update/reminder/${reminderId}/${type}/${typeId}`,
    { status }
  );
};

export const getReminders = (type, typeId) => {
  return Axios.get(`/reminders/${type}/${typeId}`);
};

export const deleteReminders = (type, typeId, reminderId) => {
  return Axios.delete(`/reminders/reminder/${reminderId}/${type}/${typeId}`);
};

export const postFeedback = (contractorId, report) => {
  return Axios.post(`/contractors/report/${contractorId}`, { report });
};
