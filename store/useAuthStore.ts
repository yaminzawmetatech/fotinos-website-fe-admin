import { create } from "zustand";
import Cookies from "js-cookie";

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;

  hydrated: boolean;          // ← ADD THIS
  login: (user: User, token: string) => void;
  logout: () => void;
  hydrate: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  hydrated: false,            // ← INITIAL STATE

  login: (user, token) => {
    Cookies.set("jwt_authorization", token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });

    localStorage.setItem("user", JSON.stringify(user));

    set({ user, token });
  },

  logout: () => {
    Cookies.remove("jwt_authorization");
    localStorage.removeItem("user");

    set({ user: null, token: null });
  },

  hydrate: () => {
    const storedUser = localStorage.getItem("user");
    const token = Cookies.get("jwt_authorization");

    if (storedUser && token) {
      set({
        user: JSON.parse(storedUser),
        token,
        hydrated: true,
      });
    } else {
      set({ hydrated: true });
    }
  },
}));