import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Tractor,
  Calendar,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const NavItem = ({
    to,
    icon: Icon,
    label,
  }: {
    to: string;
    icon: any;
    label: string;
  }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all",
          isActive ? "bg-blue-50 text-blue-600 font-medium" : "",
          isCollapsed ? "justify-center" : ""
        )
      }
    >
      <Icon className="w-5 h-5" />
      {!isCollapsed && <span className="ml-3">{label}</span>}
    </NavLink>
  );

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40",
          isCollapsed ? "w-16" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center p-4 border-b border-gray-100">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-gray-800 ml-2">Farm Admin</h1>
          )}
        </div>

        <nav className="p-2 space-y-1">
          <NavItem to="/" icon={Tractor} label="Equipment" />
          <NavItem to="/rentals" icon={Calendar} label="Rentals" />
          {user?.role === "admin" && (
            <>
              <NavItem to="/users" icon={Users} label="Users" />
              <NavItem to="/settings" icon={Settings} label="Settings" />
            </>
          )}
        </nav>

        <div
          className={cn(
            "absolute bottom-0 w-full p-4 border-t border-gray-100",
            isCollapsed ? "flex justify-center" : ""
          )}
        >
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-700 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};
