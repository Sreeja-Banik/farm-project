import React from "react";
import { Calendar, DollarSign, IndianRupee, MapPin } from "lucide-react";
import { Equipment } from "../types";
import { QuickCheckoutButton } from "./cart/QuickCheckoutButton";
import { useAuth } from "./auth/AuthContext";

interface Props {
  equipment: any;
  onRent: (equipment: Equipment) => void;
  onQuickCheckout: (equipment: Equipment) => void;
  onClick: () => void;
  onRequestLogin: () => void;
}

export function EquipmentCard({
  equipment,
  onRent,
  onQuickCheckout,
  onClick,
  onRequestLogin,
}: Props) {
  const { isAuthenticated } = useAuth();

  const handleAction = (action: () => void, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      onRequestLogin();
      return;
    }
    action();
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <img
        src={equipment.imageUrl}
        alt={equipment.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{equipment.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
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
        </div>
        <div className="flex items-center gap-2 mb-2">
          <IndianRupee className="w-5 h-5 text-green-600" />
          <span className="font-semibold">₹{equipment.dailyRate}/day</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          {/* <span className="text-sm">
            Available: {new Date(equipment.availableFrom).toLocaleDateString()}{" "}
            - {new Date(equipment.availableTo).toLocaleDateString()}
          </span> */}
          {equipment.availabilitySchedule.map((schedule, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-2 rounded"
            >
              <span className="text-sm">
                {new Date(schedule.startDate).toLocaleDateString()} -
                {new Date(schedule.endDate).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <button
            onClick={(e) => handleAction(() => onRent(equipment), e)}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            disabled={!equipment.status}
          >
            {equipment.status ? "Add to Cart" : "Not Available"}
          </button>
          {/* {equipment.available && (
            <QuickCheckoutButton
              onClick={(e) => handleAction(() => onQuickCheckout(equipment), e)}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}
