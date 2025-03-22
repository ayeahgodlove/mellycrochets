import { BASE_URL } from "../constants/api-url";

export const authService = {
  register: async (user) => await instance.post(`${BASE_URL}/users`, user),
  login: async (user) => await instance.post("${BASE_URL}/auth", user),
  logout: async () => await instance.get(`${BASE_URL}/auth/logout`),
};
