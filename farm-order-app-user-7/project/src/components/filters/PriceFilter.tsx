import React from 'react';

interface Props {
  range: [number, number];
  onChange: (range: [number, number]) => void;
}

export function PriceFilter({ range, onChange }: Props) {
  return (
    <div>
      <h3 className="font-medium mb-2">Daily Rate Range</h3>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max="1000"
            value={range[0]}
            onChange={(e) => onChange([Number(e.target.value), range[1]])}
            className="w-full"
          />
          <div className="text-sm text-gray-600">Min: ${range[0]}</div>
        </div>
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max="1000"
            value={range[1]}
            onChange={(e) => onChange([range[0], Number(e.target.value)])}
            className="w-full"
          />
          <div className="text-sm text-gray-600">Max: ${range[1]}</div>
        </div>
      </div>
    </div>
  );
}