import React from "react";
import { format } from "date-fns";
import { Check, X } from "lucide-react";
// import type { Rental } from '../types';

interface Props {
  rentals: any[];
  onUpdateStatus: (id: string, status: "approved" | "rejected") => void;
}

export const RentalList: React.FC<Props> = ({ rentals, onUpdateStatus }) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    completed: "bg-gray-100 text-gray-800",
  };
  rentals.map((rental) => {
    console.log(rental);
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Equipment
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dates
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rentals.map((rental) => (
            <tr key={rental._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={rental.equipment[0].equipmentId.imageUrl}
                    alt={rental.equipment[0].equipmentId.name}
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {rental.equipment[0].equipmentId.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{rental.user.name}</div>
                <div className="text-sm text-gray-500">{rental.user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {format(
                    new Date(rental.equipment[0].startDate),
                    "MMM d, yyyy"
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  to{" "}
                  {format(new Date(rental.equipment[0].endDate), "MMM d, yyyy")}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  ₹ {rental.totalAmount}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    statusColors[rental.status]
                  }`}
                >
                  {rental.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {rental.status === "pending" && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onUpdateStatus(rental._id, "approved")}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onUpdateStatus(rental._id, "rejected")}
                      className="text-red-600 hover:text-red-900"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
