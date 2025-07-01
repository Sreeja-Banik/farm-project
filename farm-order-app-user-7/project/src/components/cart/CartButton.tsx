import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";

interface Props {
  onClick: () => void;
}

export function CartButton({ onClick }: Props) {
  const { state } = useCart();

  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
    >
      <ShoppingCart className="w-5 h-5" />
      {state.count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
          {state.count}
        </span>
      )}
      <span>Cart</span>
    </button>
  );
}
