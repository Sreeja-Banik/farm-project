// import React, { createContext, useContext, useState } from 'react';
// import { LoadingSpinner } from '../components/LoadingSpinner';

// interface User {
//   id: string;
//   email: string;
//   role: 'admin' | 'provider';
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Mock users
// const MOCK_USERS = {
//   admin: {
//     id: '1',
//     email: 'admin@example.com',
//     password: 'admin123',
//     role: 'admin'
//   },
//   provider: {
//     id: '2',
//     email: 'provider@example.com',
//     password: 'provider123',
//     role: 'provider'
//   }
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(false);

//   const login = async (email: string, password: string) => {
//     setLoading(true);
//     try {
//       await new Promise(resolve => setTimeout(resolve, 500));

//       const adminUser = MOCK_USERS.admin;
//       const providerUser = MOCK_USERS.provider;

//       if (email === adminUser.email && password === adminUser.password) {
//         const { password: _, ...userData } = adminUser;
//         setUser(userData);
//       } else if (email === providerUser.email && password === providerUser.password) {
//         const { password: _, ...userData } = providerUser;
//         setUser(userData);
//       } else {
//         throw new Error('Invalid credentials');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     setLoading(true);
//     try {
//       await new Promise(resolve => setTimeout(resolve, 500));
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

import React, { createContext, useContext, useState, useEffect } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "provider";
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing user data
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      // Store token and user data in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.clear();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
