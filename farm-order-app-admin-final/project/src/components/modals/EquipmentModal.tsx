import React, { useState, useCallback, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import type { Equipment } from "../../types";
import { ImageUpload } from "../ImageUpload";
import { DateRangePicker } from "../DateRangePicker";
import axios from "axios";

interface Props {
  equipment?: any;
  onClose: () => void;
  onSave: (data: Partial<Equipment>) => void;
}

export const EquipmentModal: React.FC<Props> = ({
  equipment,
  onClose,
  onSave,
}) => {
  const farmEquipment = [
    { id: 1, category: "Tractors" },
    { id: 2, category: "Harvesting Equipment" },
    { id: 3, category: "Planting Equipment" },
    { id: 4, category: "Tillage Equipment" },
    { id: 5, category: "Irrigation Systems" },
    { id: 6, category: "Fertilizer Spreaders" },
    { id: 7, category: "Livestock Equipment" },
    { id: 8, category: "Crop Protection Equipment" },
    { id: 9, category: "Storage Equipment" },
    { id: 10, category: "Loading and Unloading Equipment" },
  ];
  const { user } = useAuth();
  const [providers, setProviders] = useState<
    Array<{ _id: string; name: string }>
  >([]);
  useEffect(() => {
    if (user?.role === "admin") {
      // Fetch providers list
      const fetchProviders = async () => {
        try {
          const response = await fetch(
            "http://localhost:5000/api/users/providers",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setProviders(data);
          }
        } catch (error) {
          console.error("Failed to fetch providers:", error);
        }
      };
      fetchProviders();
    }
  }, [user]);
  console.log("Equipment:", equipment);
  const [formData, setFormData] = useState({
    name: equipment?.name ?? "",
    description: equipment?.description ?? "",
    daily_rate: equipment?.dailyRate ?? 0,
    image_url: equipment?.imageUrl ?? "",
    additional_images: equipment?.additional_images ?? [],
    category: equipment?.category ?? "",
    status: equipment?.status ?? "available",
    service_areas: equipment?.serviceAreas ?? [""],
    quantity: equipment?.quantity ?? 1,
    quantity_available: equipment?.quantityAvailable ?? 1,
    providerId:
      equipment?.providerId ?? (user?.role === "provider" ? user._id : ""),
    provider: equipment?.provider ?? { id: "", name: "", contact: "" },
    availability_schedule: equipment?.availabilitySchedule ?? [],
    specifications: equipment?.specifications ?? {
      power: "",
      weight: "",
      width: "",
    },
  });

  formData.service_areas.map((data) => console.log("----", data));

  const handleImageUpload = useCallback((url: string) => {
    setFormData((prev) => ({ ...prev, image_url: url }));
  }, []);

  const handleAdditionalImageUpload = useCallback((url: string) => {
    setFormData((prev) => ({
      ...prev,
      additional_images: [...prev.additional_images, url],
    }));
  }, []);

  const removeAdditionalImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      additional_images: prev.additional_images.filter((_, i) => i !== index),
    }));
  };

  const addServiceArea = () => {
    setFormData((prev) => ({
      ...prev,
      service_areas: [...prev.service_areas, ""],
    }));
  };

  const removeServiceArea = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      service_areas: prev.service_areas.filter((_, i) => i !== index),
    }));
  };

  const updateServiceArea = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      service_areas: prev.service_areas.map((area, i) =>
        i === index ? value : area
      ),
    }));
  };

  const handleAvailabilityChange = (dates: any) => {
    // console.log("Selected dates:", dates);
    // setFormData((prev) => ({
    //   ...prev,
    //   availability_schedule: [...prev.availability_schedule, dates],
    // }));
    setFormData((prev) => ({
      ...prev,
      availability_schedule: [
        ...prev.availability_schedule,
        { startDate: dates.start_date, endDate: dates.end_date },
      ],
    }));
  };

  const removeAvailabilityDate = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      availability_schedule: prev.availability_schedule.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const cleanedData = {
  //     ...formData,
  //     service_areas: formData.service_areas.filter(
  //       (area) => area.trim() !== ""
  //     ),
  //     providerId: user?.role === "provider" ? user._id : formData.providerId,
  //   };
  //   console.log("Submitting data:", cleanedData);
  //   onSave(cleanedData);
  //   onClose();
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedData = {
      // ...formData,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      dailyRate: formData.daily_rate,
      status: formData.status,
      quantity: formData.quantity,
      quantityAvailable: formData.quantity_available,
      provider: formData.provider,
      availabilitySchedule: formData.availability_schedule,
      availableFrom: formData.status,
      availableTo: formData.status,
      specifications: formData.specifications,
      // additionalImages: formData.additional_images,
      imageUrl: formData.image_url,
      // imageUrl: "https",
      serviceAreas: formData.service_areas.filter((area) => area.trim() !== ""),
      providerId: user?.role === "provider" ? user._id : formData.providerId,
    };

    try {
      // const endpoint = equipment
      //   ? `http://localhost:5000/api/equipment/${equipment._id}`
      //   : "http://localhost:5000/api/equipment";
      // const method = equipment ? "PUT" : "POST";

      // const response = await fetch(endpoint, {
      //   method,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      //   body: JSON.stringify(cleanedData),
      // });

      if (equipment) {
        const { data } = await axios.put(
          `http://localhost:5000/api/equipment/${equipment._id}`,
          cleanedData,
          {
            headers: {
              // "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (data) {
          // const result = await response.json();
          console.log("Success:", data);
          onSave(formData); // Pass the result back to the parent
          onClose();
        }
        // else {
        //   console.error("Failed to save equipment:", await response.text());
        // }
      } else {
        const { data } = await axios.post(
          "http://localhost:5000/api/equipment",
          cleanedData,
          {
            headers: {
              // "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (data) {
          // const result = await response.json();
          console.log("Success:", data);
          onSave(formData); // Pass the result back to the parent
          onClose();
        }
      }

      // const response = await axios.post(
      //   "http://localhost:5000/api/equipment",
      //   cleanedData,
      //   {
      //     headers: {
      //       // "Content-Type": "application/json",
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   }
      // );
      // const formData = new FormData();
      // Object.entries(cleanedData).forEach(([key, value]) => {
      //   if (key === "image_url" && value) {
      //     formData.append("image", value); // Assuming `image_url` holds the file object
      //   } else if (key === "additional_images" && Array.isArray(value)) {
      //     value.forEach((image, idx) =>
      //       formData.append(`additional_image_${idx}`, image)
      //     ); // Handle multiple files
      //   } else {
      //     formData.append(key, JSON.stringify(value));
      //   }
      // });
      // console.log(formData);
      // const response = await fetch(endpoint, {
      //   method,
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      //   body: formData,
      // });

      // if (response.ok) {
      //   const result = await response.json();
      //   console.log("Success:", result);
      //   onSave(result); // Pass the result back to the parent
      //   onClose();
      // } else {
      //   console.error("Failed to save equipment:", await response.text());
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  formData.service_areas.map((data) => console.log(data));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {equipment ? "Edit Equipment" : "Add Equipment"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-200 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Daily Rate
              </label>
              <input
                type="number"
                value={formData.daily_rate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    daily_rate: Number(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              value={formData.image_url}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image_url: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="1"
              required
            />
          </div>

          <div className="grid grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Power
              </label>
              <input
                type="text"
                value={formData.specifications.power}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    specifications: {
                      ...formData.specifications,
                      power: e.target.value,
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                weight
              </label>
              <input
                type="text"
                value={formData.specifications.weight}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    specifications: {
                      ...formData.specifications,
                      weight: e.target.value,
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Width
              </label>
              <input
                type="text"
                value={formData.specifications.width}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    specifications: {
                      ...formData.specifications,
                      width: e.target.value,
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                max={formData.quantity}
                required
              />
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => {
                  // console.log(e.target.value);

                  setFormData({
                    ...formData,
                    category: e.target.value,
                  });

                  // console.log(formData);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                // required
              >
                {/* <option value="">Select Provider</option> */}
                {farmEquipment.map((farmEquipment) => (
                  <option key={farmEquipment.id} value={farmEquipment.category}>
                    {farmEquipment.category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload Section */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Image
            </label>
            <ImageUpload
              currentImage={formData.image_url}
              onUpload={handleImageUpload}
            />
          </div> */}

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Images
            </label>
            <div className="grid grid-cols-3 gap-4">
              {formData.additional_images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt=""
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <ImageUpload onUpload={handleAdditionalImageUpload} />
            </div>
          </div> */}

          {/* Service Areas Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Service Areas (ZIP Codes)
              </label>
              <button
                type="button"
                onClick={addServiceArea}
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add ZIP Code
              </button>
            </div>
            <div className="space-y-2">
              {formData.service_areas.map((area, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {/* {area}
                  {index} */}
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => updateServiceArea(index, e.target.value)}
                    placeholder="Enter ZIP code"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    pattern="[0-9]{5}"
                    maxLength={5}
                  />
                  <button
                    type="button"
                    onClick={() => removeServiceArea(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Enter 5-digit ZIP codes where this equipment is available for rent
            </p>
          </div>

          {/* Quantity and Provider Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Quantity
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: Number(e.target.value) })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Available Quantity
              </label>
              <input
                type="number"
                value={formData.quantity_available}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity_available: Number(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                max={formData.quantity}
                required
              />
            </div>
          </div>

          {/* Provider Information */}
          {/*<div className="space-y-4">
            <h3 className="text-lg font-medium">Provider Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Provider Name</label>
                <input
                  type="text"
                  value={formData.provider.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    provider: { ...formData.provider, name: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Provider Contact</label>
                <input
                  type="text"
                  value={formData.provider.contact}
                  onChange={(e) => setFormData({
                    ...formData,
                    provider: { ...formData.provider, contact: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>
          */}

          {user?.role === "admin" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Provider
              </label>
              <select
                value={formData.providerId}
                onChange={(e) => {
                  // console.log(e.target.value);
                  const selectedProvider = providers.find(
                    (provider) => provider._id === e.target.value
                  );
                  console.log(selectedProvider);
                  if (selectedProvider) {
                    setFormData((prev) => ({
                      ...prev,
                      provider: {
                        id: selectedProvider._id,
                        name: selectedProvider.name,
                        contact: "", // Include contact if available
                      },
                      providerId: selectedProvider._id,
                    }));
                  } else {
                    setFormData({
                      ...formData,
                      providerId: e.target.value,
                    });
                  }

                  console.log(formData);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                // required
              >
                {/* <option value="">Select Provider</option> */}
                {providers.map((provider) => (
                  <option key={provider._id} value={provider._id}>
                    {provider.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Availability Schedule */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Availability Schedule
              </label>
              <DateRangePicker onSelect={handleAvailabilityChange} />
            </div>
            <div className="space-y-2">
              {formData.availability_schedule.map((schedule, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <span className="text-sm">
                    {/* {new Date(schedule.start_date).toLocaleDateString()} -
                    {new Date(schedule.end_date).toLocaleDateString()} */}
                    {new Date(schedule.startDate).toLocaleDateString()} -
                    {new Date(schedule.endDate).toLocaleDateString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeAvailabilityDate(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
