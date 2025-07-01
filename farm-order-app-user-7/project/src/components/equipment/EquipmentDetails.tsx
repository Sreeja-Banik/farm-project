import React from "react";
import { X, Calendar, IndianRupee, MapPin } from "lucide-react";
import { Equipment } from "../../types";
import { EquipmentSpecifications } from "./EquipmentSpecifications";
import { EquipmentReviews } from "./EquipmentReviews";
import { AddReview } from "./AddReview";
import toast from "react-hot-toast";

interface Props {
  equipment: any;
  onClose: () => void;
  onRent: (equipment: Equipment) => void;
  onRequestLogin: () => void;
}

export function EquipmentDetails({
  equipment,
  onClose,
  onRent,
  onRequestLogin,
}: Props) {
  const handleAddReview = (rating: number, comment: string) => {
    // In a real app, this would make an API call to save the review
    toast.success("Review submitted successfully!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{equipment.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div>
            <img
              src={equipment.imageUrl}
              alt={equipment.name}
              className="w-full h-[300px] object-cover rounded-lg"
            />
            <div className="mt-4 space-y-4">
              {/* <div className="flex items-center gap-2"> */}
              <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-green-600" />
                <span className="text-xl font-semibold">
                  ₹ {equipment.dailyRate}/day
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="truncate">
                  {equipment.serviceAreas?.length
                    ? `Available in: ${equipment.serviceAreas.join(", ")}`
                    : "No service areas specified"}
                </span>
              </div>
              {/* </div> */}

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
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{equipment.description}</p>
            </div>

            <EquipmentSpecifications
              specifications={equipment.specifications}
            />

            <button
              onClick={() => onRent(equipment)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              disabled={!equipment.status}
            >
              {equipment.status ? "Rent Now" : "Not Available"}
            </button>
          </div>
        </div>

        <div className="border-t p-6">
          <h3 className="text-lg font-semibold mb-4">Reviews</h3>
          <AddReview
            onSubmit={handleAddReview}
            onRequestLogin={onRequestLogin}
          />
          <div className="mt-6">
            <EquipmentReviews reviews={equipment.reviews || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
