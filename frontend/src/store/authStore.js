import { create } from "zustand";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  mesaage: null,

  loginUser: async (loginData) => {
    const response = await api.post("/login", loginData);
    console.log(response);
    if (response.data.isAuthenticated) {
      set({
        user: response.data.username,
        isAuthenticated: true,
        loading: false,
        message: response.data.mesaage,
      });
    }
    return {
      username: response.data.username,
      isAuthenticated: response.data.isAuthenticated,
      message: response.data.message,
    };
  },

  registerUser: async (registerData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/register", registerData);
      set({
        loading: false,
        message: response.data.message,
        isAuthenticated: false,
      });
    } catch (error) {
      set({loading: false, error: error.mesaage() })
    }
  },
  
  logoutUser : async () => {
    try {
      await api.post('logout')
      set({isAuthenticated: false, user: null, loading: false})
    } catch (error) {
      set({error: error.message, loading: false})
    }
  }
}));

export default useAuthStore;
