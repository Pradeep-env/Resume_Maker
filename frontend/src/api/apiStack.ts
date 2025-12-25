import axiosClient from "./axiosClient";

const apiStack = {
  getUser: () => axiosClient.get("/state"),
  login: (data: any) => axiosClient.post("/login", data),
  logout: () => axiosClient.post("/logout"),
  register: (data: any) => axiosClient.post("/signup", data),
};

export default apiStack;