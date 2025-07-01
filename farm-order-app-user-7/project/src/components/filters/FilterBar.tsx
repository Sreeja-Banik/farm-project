import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { CategoryFilter } from './CategoryFilter';
import { PriceFilter } from './PriceFilter';

interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: 'date' | 'price';
  onSortChange: (value: 'date' | 'price') => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export function FilterBar({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  showFilters,
  onToggleFilters,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search equipment..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={onToggleFilters}
          className="px-4 py-2 bg-white border rounded-lg flex items-center gap-2 hover:bg-gray-50"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as 'date' | 'price')}
          className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
        >
          <option value="date">Sort by Date</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <CategoryFilter
            selectedCategories={selectedCategories}
            onChange={onCategoryChange}
          />
          <PriceFilter
            range={priceRange}
            onChange={onPriceRangeChange}
          />
        </div>
      )}
    </div>
  );
}