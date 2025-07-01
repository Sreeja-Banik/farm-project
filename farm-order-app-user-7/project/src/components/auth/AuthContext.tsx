// import React, { createContext, useContext, useState } from 'react';
// import toast from 'react-hot-toast';

// interface User {
//   id: string;
//   email: string;
//   name: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => void;
//   signup: (email: string, password: string, name: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);

//   const login = (email: string, password: string) => {
//     setUser({
//       id: '1',
//       email,
//       name: email.split('@')[0],
//     });
//     toast.success('Logged in successfully!');
//   };

//   const signup = (email: string, password: string, name: string) => {
//     setUser({
//       id: '1',
//       email,
//       name,
//     });
//     toast.success('Account created successfully!');
//   };

//   const logout = () => {
//     setUser(null);
//     toast.success('Logged out successfully!');
//   };

//   return (
//     <AuthContext.Provider value={{
//       user,
//       isAuthenticated: !!user,
//       login,
//       signup,
//       logout
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => any;
  signup: (email: string, password: string, name: string) => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser && storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const onLogin = React.useCallback(async (email: string, password: string) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/users/login`,
        { email, password }
      );
      return data;
    } catch (e: any) {
      toast.error("Login failed!");
      return e?.response;
    }
  }, []);

  const onSignUp = React.useCallback(
    async (email: string, password: string, name: string) => {
      try {
        const { data } = await axios.post(
          `http://localhost:5000/api/users/signup`,
          { email, password, name }
        );
        return data;
      } catch (e: any) {
        toast.error("Request failed!", { duration: 4000 });
        return e?.response;
      }
    },
    []
  );

  const login = async (email: string, password: string) => {
    const response = await onLogin(email, password);
    console.log(response);
    if (!response?.token && response.status !== 200) {
      return response?.data?.error;
    }

    setUser(response.user);
    setToken(response.token);

    // Persist to localStorage
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("token", response.token);

    toast.success("Logged in successfully!");
  };

  const signup = async (email: string, password: string, name: string) => {
    const response = await onSignUp(email, password, name);
    if (response.status !== 200 || response.status === 500) {
      // console.log(response);
      return response.data.error;
    }
    // setUser(response.user);
    // setToken(response.token);

    // // Persist to localStorage
    // localStorage.setItem("user", JSON.stringify(response.user));
    // localStorage.setItem("token", response.token);

    toast.success(
      "Account created successfully! \n Please login to continue!",
      { duration: 5000 }
    );
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    // Clear from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.setItem("isLogout", "true");

    toast.success("Logged out successfully!");
  };

  useEffect(() => {
    // Optionally, handle token expiration or other side effects here
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
