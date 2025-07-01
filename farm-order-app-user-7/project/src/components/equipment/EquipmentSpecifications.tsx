import React from 'react';
import { Wrench } from 'lucide-react';
import { Equipment } from '../../types';

interface Props {
  specifications: Equipment['specifications'];
}

export function EquipmentSpecifications({ specifications }: Props) {
  if (!specifications || Object.keys(specifications).length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Specifications</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(specifications).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-gray-500" />
            <span className="capitalize">{key}:</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}