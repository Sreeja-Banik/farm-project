import React, { useState, useEffect } from "react";
import { PageHeader } from "../components/PageHeader";
import { Plus, Edit2, Trash2, UserCheck, UserX } from "lucide-react";
import { UserModal } from "../components/modals/UserModal";
import { ConfirmModal } from "../components/modals/ConfirmModal";
import toast from "react-hot-toast";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: "approved" | "inactive" | "pending";
}

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(data as any[]);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  //create a usecallback function to handle the add user
  const useAddUser = async (dataUser: Partial<User>) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/users/signup`,
        dataUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await fetchUsers();
      setShowAddModal(false);
      toast.success("User added successfully");
    } catch (error) {
      toast.error("Failed to add user");
    }
  };

  const useEditUser = async (val) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/users/edit/${val._id}`,
        val,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await fetchUsers();
      setShowAddModal(false);
      toast.success("User Updated successfully");
    } catch (error) {
      toast.error("Failed to Update user");
    }
  };

  const useDeleteUser = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await fetchUsers();
      // setShowAddModal(false);
      toast.success("User Deleted successfully");
    } catch (error) {
      toast.error("Failed to Delete user");
    }
  };

  const useApproveUser = async (id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/users/approve/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await fetchUsers();
      setShowAddModal(false);
      toast.success("User approved successfully");
    } catch (error) {
      toast.error("Failed to approve user");
    }
  };

  const useRejectUser = async (id) => {
    console.log(localStorage.getItem("token"));
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/users/reject/${id}`,
        {
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await fetchUsers();
      setShowAddModal(false);
      toast.success("User Rejected successfully");
    } catch (error) {
      toast.error("Failed to Reject user");
    }
  };

  const handleAdd = (data: any) => {
    const newUser = {
      // id: Date.now().toString(),
      ...data,
      status: "inactive",
    } as User;
    // setUsers([...users, newUser]);
    useAddUser(data);
    // toast.success("User added successfully");
  };

  const handleEdit = (data: Partial<User>) => {
    if (!editingUser) return;
    // setUsers(
    //   users.map((user) =>
    //     user._id === editingUser._id ? { ...user, ...data } : user
    //   )
    // );
    // console.log(data);
    useEditUser(data);
    // toast.success("User updated successfully");
  };

  const handleDelete = (id: string) => {
    // setUsers(users.filter((user) => user._id !== id));
    // toast.success("User deleted successfully");
    useDeleteUser(id);
    setDeletingId(null);
  };

  const handleApprove = (id: string) => {
    // setUsers(
    //   users.map((user) =>
    //     user._id === id ? { ...user, status: "active" } : user
    //   )
    // );
    // toast.success("User approved successfully");
    useApproveUser(id);
  };

  const handleReject = (id: string) => {
    // setUsers(
    //   users.map((user) =>
    //     user._id === id ? { ...user, status: "inactive" } : user
    //   )
    // );
    useRejectUser(id);
    // toast.success("User rejected");
  };
  return (
    <div className="p-6">
      <PageHeader title="User Management">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add User
        </button>
      </PageHeader>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : user.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {user.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleApprove(user._id)}
                          className="text-green-600 hover:text-green-900"
                          title="Approve"
                        >
                          <UserCheck className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleReject(user._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Reject"
                        >
                          <UserX className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditingUser(user)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setDeletingId(user._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(showAddModal || editingUser) && (
        <UserModal
          user={editingUser}
          onClose={() => {
            setShowAddModal(false);
            setEditingUser(undefined);
          }}
          onSave={editingUser ? handleEdit : handleAdd}
        />
      )}

      {deletingId && (
        <ConfirmModal
          title="Delete User"
          message="Are you sure you want to delete this user? This action cannot be undone."
          onConfirm={() => handleDelete(deletingId)}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
};
