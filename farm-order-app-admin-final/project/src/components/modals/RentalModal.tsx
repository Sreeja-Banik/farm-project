import React, { useState } from 'react';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { Equipment } from '../../types';
import { isEquipmentAvailable } from '../../utils/availability';

interface Props {
  equipment: Equipment;
  onClose: () => void;
  onSubmit: (data: {
    startDate: string;
    endDate: string;
    zipCode: string;
  }) => void;
  existingRentals: any[];
}

export const RentalModal: React.FC<Props> = ({
  equipment,
  onClose,
  onSubmit,
  existingRentals,
}) => {
  const [formData, setFormData] = useState({
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    zipCode: '',
  });
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const availability = isEquipmentAvailable(
      equipment,
      formData.startDate,
      formData.endDate,
      formData.zipCode,
      existingRentals
    );

    if (!availability.available) {
      setError(availability.reason || 'Equipment is not available');
      return;
    }

    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Rent Equipment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={formData.startDate}
              min={format(new Date(), 'yyyy-MM-dd')}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={formData.endDate}
              min={formData.startDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Delivery ZIP Code</label>
            <input
              type="text"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              placeholder="Enter ZIP code"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              pattern="[0-9]{5}"
              maxLength={5}
              required
            />
            {equipment.service_areas && equipment.service_areas.length > 0 && (
              <p className="mt-1 text-sm text-gray-500">
                Available in: {equipment.service_areas.join(', ')}
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="mt-6 flex justify-end space-x-3">
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
              Submit Rental Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};