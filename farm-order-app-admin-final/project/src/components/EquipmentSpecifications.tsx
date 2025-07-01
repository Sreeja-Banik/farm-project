import React from "react";
import { Wrench } from "lucide-react";
// import { Equipment } from '../../types';
export interface specifications {
  specifications?: {
    power?: string;
    weight?: string;
    width?: string;
  };
}
interface Props {
  specifications: specifications;
}

export function EquipmentSpecifications({ specifications }: Props) {
  if (!specifications || Object.keys(specifications).length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-sm text-gray-500 font-semibold mb-2">
        Specifications
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(specifications).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-gray-500" />
            <span className="capitalize text-sm text-gray-500">{key}:</span>
            <span className="font-medium text-sm text-gray-500">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
