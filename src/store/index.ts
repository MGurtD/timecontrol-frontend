import { defineStore } from "pinia";
import { login } from "../api/user.api";
import { User, UserLogin } from "../types";
import { USER_KEY } from "../utils/constants";

export const useStore = defineStore("applicationStore", {
  state: () => {
    return {
      user: null as User | null,
    };
  },
  getters: {
    getUser: (state) => {
      let lsUser = localStorage.getItem(USER_KEY);
      if (state.user !== null) {
        return state.user;
      } else if (lsUser !== null) {
        state.user = JSON.parse(lsUser);
        return state.user;
      } else {
        return null;
      }
    },
    isLogged() {
      return this.getUser !== null;
    },
  },
  actions: {
    async login(user: UserLogin) {
      try {
        const response = await login(user);
        this.user = response.data as User;
        localStorage.setItem(USER_KEY, JSON.stringify(this.user));
      } catch (err) {
        console.error(err);
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem(USER_KEY);
    },
  },
});
