import React, { useState, useEffect } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { equipmentService } from "../services/equipment";
import { EquipmentCard } from "../components/EquipmentCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageHeader } from "../components/PageHeader";
import { EquipmentModal } from "../components/modals/EquipmentModal";
import { ConfirmModal } from "../components/modals/ConfirmModal";
import type { Equipment } from "../types";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

export const EquipmentPage = () => {
  const { user } = useAuth();
  const [equipment, setEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<
    Equipment | undefined
  >();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchEquipment();
  }, []);
  // console.log(user.role === "admin" _id);

  const fetchEquipment = async () => {
    try {
      const data2 = await equipmentService.getAll();
      const { data } = await axios.get(
        user?.role === "provider"
          ? `http://localhost:5000/api/equipment/provider/${user?._id}`
          : `http://localhost:5000/api/equipment`,
        {
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEquipment(data as any[]);
    } catch (error) {
      toast.error("Failed to fetch equipment");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data: Partial<Equipment>) => {
    try {
      await fetchEquipment();
      // const newEquipment = await equipmentService.create(data as Equipment);
      // setEquipment((prev) => [...prev, newEquipment]);
      setShowAddModal(false);
      toast.success("Equipment added successfully");
    } catch (error) {
      toast.error("Failed to add equipment");
    }
  };

  const handleEdit = async (data: Partial<Equipment>) => {
    if (!editingEquipment) return;

    try {
      await fetchEquipment();
      // const updatedEquipment = await equipmentService.update(
      //   editingEquipment.id,
      //   data
      // );
      // setEquipment((prev) =>
      //   prev.map((item) =>
      //     item.id === editingEquipment.id ? updatedEquipment : item
      //   )
      // );
      setEditingEquipment(undefined);
      toast.success("Equipment updated successfully");
    } catch (error) {
      toast.error("Failed to update equipment");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // await equipmentService.delete(id);
      // setEquipment((prev) => prev.filter((item) => item.id !== id));
      const { data } = await axios.delete(
        `http://localhost:5000/api/equipment/${id}`,
        {
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // setEquipment(data as any[]);
      fetchEquipment();
      toast.success("Equipment deleted successfully");
    } catch (error) {
      toast.error("Failed to delete equipment");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  console.log("equipment", equipment);
  const categories = [
    "all",
    ...Array.from(new Set(equipment.map((item) => item.category))),
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  console.log("filteredEquipment", filteredEquipment);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <PageHeader title="Equipment Management">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Equipment
        </button>
      </PageHeader>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search equipment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-400 w-5 h-5" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 py-2 px-3"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredEquipment.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No equipment found matching your criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEquipment.map((item) => (
            <EquipmentCard
              key={item._id}
              equipment={item}
              onEdit={setEditingEquipment}
              onDelete={() => setDeletingId(item._id)}
            />
          ))}
        </div>
      )}

      {(showAddModal || editingEquipment) && (
        <EquipmentModal
          equipment={editingEquipment}
          onClose={() => {
            setShowAddModal(false);
            setEditingEquipment(undefined);
          }}
          onSave={editingEquipment ? handleEdit : handleAdd}
        />
      )}

      {deletingId && (
        <ConfirmModal
          title="Delete Equipment"
          message="Are you sure you want to delete this equipment? This action cannot be undone."
          onConfirm={() => handleDelete(deletingId)}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
};
