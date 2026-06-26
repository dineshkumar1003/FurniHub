import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import axios from "axios";

interface AuthCtx {
  user: any;

  login: (
    email: string,
    password: string
  ) => Promise<any>;

  register: (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<void>;

  logout: () => void;
}

const Ctx = createContext<AuthCtx>(
  {} as AuthCtx
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined")
      return;

    const raw =
      localStorage.getItem(
        "fh-user"
      );

    if (raw) {
      setUser(JSON.parse(raw));
    }
  }, []);

  const persist = (u: any) => {
    setUser(u);

    if (
      typeof window === "undefined"
    )
      return;

    if (u) {
      localStorage.setItem(
        "fh-user",
        JSON.stringify(u)
      );

      localStorage.setItem(
        "token",
        u.token
      );
    } else {
      localStorage.removeItem(
        "fh-user"
      );

      localStorage.removeItem(
        "token"
      );
    }
  };

    const login = async (
      email: string,
      password: string
    ) => {
      const { data } =
        await axios.post(
          "https://furnihub-hlkx.onrender.com/api/users/login",
          {
            email,
            password,
          }
        );

      persist(data);

      return data;
    };
  const register = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => {
    const { data } =
      await axios.post(
        "https://furnihub-hlkx.onrender.com/api/users/register",
        {
          name,
          email,
          phone,
          password,
        }
      );

    persist(data);
  };

  const logout = () => {
    persist(null);
  };

  return (
    <Ctx.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () =>
  useContext(Ctx);