import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { CartButton } from '../cart/CartButton';

interface Props {
  onCartClick: () => void;
  onOrdersClick: () => void;
}

export function ActionBar({ onCartClick, onOrdersClick }: Props) {
  return (
    <div className="flex items-center gap-2">
      <CartButton onClick={onCartClick} />
      <button
        onClick={onOrdersClick}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
      >
        <ShoppingBag className="w-5 h-5" />
        <span>Orders</span>
      </button>
    </div>
  );
}