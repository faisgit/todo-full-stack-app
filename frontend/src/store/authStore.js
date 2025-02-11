import { create } from "zustand";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
const useAuthStore = create((set) => ({
  user: localStorage.getItem('user') || null,
  isAuthenticated: localStorage.getItem('isAuthenticated') === "true" ,
  loading: false,
  message: null,

  loginUser: async (loginData) => {
    const response = await api.post("/login", loginData);
    console.log(response);
      set({
        user: response.data.username,
        isAuthenticated: true,
        loading: false,
        message: response.data.message,
      });
      localStorage.setItem('isAuthenticated', true)
      localStorage.setItem('user', response.data.username)
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
      set({loading: false, error: error.message })
    }
  },
  
  logoutUser : async () => {
    try {
      const response  = await api.post('/logout')
      set({isAuthenticated: false, user: null, loading: false, message: response.data.message})
      localStorage.setItem('isAuthenticated', false)
      localStorage.setItem('user', null)
      return {
        message : response.data.message,
        isAuthenticated: response.data.isAuthenticated
      }
    } catch (error) {
      set({error: error.message, loading: false})
    }
  }
}));

export default useAuthStore;
