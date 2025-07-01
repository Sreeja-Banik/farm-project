import React, { useState } from 'react';
import { Equipment } from '../types';
import { useAuth } from './auth/AuthContext';

interface Props {
  equipment: Equipment;
  onSubmit: (startDate: string, endDate: string) => void;
  onClose: () => void;
  onRequestLogin: () => void;
}

export function RentalForm({ equipment, onSubmit, onClose, onRequestLogin }: Props) {
  const [startDate, setStartDate] = useState(equipment.availableFrom);
  const [endDate, setEndDate] = useState('');
  const { isAuthenticated } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      onRequestLogin();
      return;
    }
    onSubmit(startDate, endDate);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Rent {equipment.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              min={equipment.availableFrom}
              max={equipment.availableTo}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              min={startDate || equipment.availableFrom}
              max={equipment.availableTo}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isAuthenticated ? 'Confirm Rental' : 'Login to Rent'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}