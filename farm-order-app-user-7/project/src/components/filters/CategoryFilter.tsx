import React from 'react';

const CATEGORIES = ['Tractor', 'Harvester', 'Plow', 'Seeder', 'Irrigation'];

interface Props {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

export function CategoryFilter({ selectedCategories, onChange }: Props) {
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onChange(selectedCategories.filter(c => c !== category));
    } else {
      onChange([...selectedCategories, category]);
    }
  };

  return (
    <div>
      <h3 className="font-medium mb-2">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategories.includes(category)
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}