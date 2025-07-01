import React from 'react';
import {LogIn, LogOut, User} from 'lucide-react';
import { useAuth } from './AuthContext';

export function UserMenu({
    setLoginModalOpen,
                         }) {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
      return (
          <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">{user?.name}</span>
              </div>
              <button
                  onClick={setLoginModalOpen}
                  className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
              >
                  <LogIn className="w-4 h-4" />
                  Login
              </button>
          </div>
      );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <User className="w-5 h-5 text-gray-600" />
        <span className="text-gray-700">{user?.name}</span>
      </div>
      <button
        onClick={logout}
        className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  );
}