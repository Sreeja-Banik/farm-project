import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface Props {
  onClick: () => void;
}

export function QuickCheckoutButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full mt-2 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 flex items-center justify-center gap-2"
    >
      <ShoppingBag className="w-4 h-4" />
      Quick Checkout
    </button>
  );
}