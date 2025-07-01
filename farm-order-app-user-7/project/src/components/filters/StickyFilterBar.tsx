import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";
import { ClearFiltersButton } from "./ClearFiltersButton";

interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: "date" | "price" | "availability";
  onSortChange: (value: "date" | "price") => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  onClearFilters: () => void;
}

export function StickyFilterBar(props: Props) {
  const hasActiveFilters =
    props.searchTerm !== "" ||
    props.selectedCategories.length > 0 ||
    props.priceRange[0] !== 0 ||
    props.priceRange[1] !== 1000;

  return (
    <div className="sticky top-[72px] bg-gray-50 z-10 py-4 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search equipment..."
                value={props.searchTerm}
                onChange={(e) => props.onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={props.onToggleFilters}
              className="px-4 py-2 bg-white border rounded-lg flex items-center gap-2 hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <select
              value={props.sortBy}
              onChange={(e) =>
                props.onSortChange(e.target.value as "date" | "price")
              }
              className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
            >
              <option value="date">Sort by Date</option>
              <option value="price">Sort by Price</option>
            </select>
            <ClearFiltersButton
              onClear={props.onClearFilters}
              isVisible={hasActiveFilters}
            />
          </div>

          {props.showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
              <CategoryFilter
                selectedCategories={props.selectedCategories}
                onChange={props.onCategoryChange}
              />
              <PriceFilter
                range={props.priceRange}
                onChange={props.onPriceRangeChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
