import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

interface Props {
  onSelect: (dates: { start_date: string; end_date: string }) => void;
}

export const DateRangePicker: React.FC<Props> = ({ onSelect }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleAdd = () => {
    if (startDate && endDate) {
      onSelect({ start_date: startDate, end_date: endDate });
      setStartDate('');
      setEndDate('');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="date"
        value={startDate}
        min={format(new Date(), 'yyyy-MM-dd')}
        onChange={(e) => setStartDate(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <span>to</span>
      <input
        type="date"
        value={endDate}
        min={startDate || format(new Date(), 'yyyy-MM-dd')}
        onChange={(e) => setEndDate(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={handleAdd}
        disabled={!startDate || !endDate}
        className="p-2 text-blue-500 hover:text-blue-600 disabled:opacity-50"
      >
        <Calendar className="w-5 h-5" />
      </button>
    </div>
  );
};