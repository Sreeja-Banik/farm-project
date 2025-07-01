import React, { useState } from "react";
import { Edit2, Trash2, MapPin, Calendar, Info } from "lucide-react";
import type { Equipment } from "../types";
import { RentalModal } from "./modals/RentalModal";
import { EquipmentSpecifications } from "./EquipmentSpecifications";

interface Props {
  equipment: Equipment;
  onEdit: (equipment: Equipment) => void;
  onDelete: (id: string) => void;
  onRent?: (
    equipmentId: string,
    data: { startDate: string; endDate: string; zipCode: string }
  ) => void;
  existingRentals?: any[];
}

export const EquipmentCard: React.FC<Props> = ({
  equipment,
  onEdit,
  onDelete,
  onRent,
  existingRentals = [],
}) => {
  const [showRentalModal, setShowRentalModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const statusColors = {
    available: "bg-green-100 text-green-800 border-green-200",
    rented: "bg-blue-100 text-blue-800 border-blue-200",
    maintenance: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };

  const handleRent = (data: {
    startDate: string;
    endDate: string;
    zipCode: string;
  }) => {
    onRent?.(equipment.id, data);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative group">
          <img
            src={equipment.imageUrl}
            alt={equipment.name}
            className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {equipment.additionalImages?.length > 0 && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="absolute bottom-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all"
            >
              <Info className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
              {equipment.name}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                statusColors[equipment.status]
              }`}
            >
              {equipment.status}
            </span>
          </div>

          <p className="mt-2 text-gray-600 text-sm line-clamp-2">
            {equipment.description}
          </p>

          <div className="mt-3 space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">
                {equipment.serviceAreas?.length
                  ? `Available in: ${equipment.serviceAreas.join(", ")}`
                  : "No service areas specified"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {equipment.provider && (
                <div className="text-sm text-gray-500">
                  Provider: {equipment.provider.name}
                </div>
              )}

              <div className="text-sm text-gray-500">
                Available Units: {equipment.quantityAvailable}/
                {equipment.quantity}
              </div>
            </div>

            <EquipmentSpecifications
              specifications={equipment.specifications}
            />
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-blue-600">
              RS-{equipment.dailyRate}/day
            </span>

            <div className="flex space-x-2">
              {equipment.status === "available" && onRent && (
                <button
                  onClick={() => setShowRentalModal(true)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  title="Rent Equipment"
                >
                  <Calendar className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => onEdit(equipment)}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(equipment._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Additional Images Gallery */}
        {showDetails && equipment.additional_images?.length > 0 && (
          <div className="p-4 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Additional Images
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {equipment.additional_images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${equipment.name} view ${idx + 1}`}
                  className="w-full h-20 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {showRentalModal && (
        <RentalModal
          equipment={equipment}
          onClose={() => setShowRentalModal(false)}
          onSubmit={handleRent}
          existingRentals={existingRentals}
        />
      )}
    </>
  );
};
