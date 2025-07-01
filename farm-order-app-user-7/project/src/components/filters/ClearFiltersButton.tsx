import React from 'react';
import { X } from 'lucide-react';

interface Props {
  onClear: () => void;
  isVisible: boolean;
}

export function ClearFiltersButton({ onClear, isVisible }: Props) {
  if (!isVisible) return null;
  
  return (
    <button
      onClick={onClear}
      className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md"
    >
      <X className="w-4 h-4" />
      Clear Filters
    </button>
  );
}