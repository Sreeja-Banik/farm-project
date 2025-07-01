import React from 'react';
import { PageHeader } from '../components/PageHeader';

export const SettingsPage = () => {
  return (
    <div className="p-6">
      <PageHeader title="Settings" />
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">General Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter company name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="contact@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Notification Settings</label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Email notifications for new rentals</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Daily report summary</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};