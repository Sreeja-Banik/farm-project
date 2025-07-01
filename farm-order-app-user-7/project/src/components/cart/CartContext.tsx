import React, { createContext, useContext, useReducer } from "react";
import { Equipment } from "../../types";

// interface CartItem

interface CartState {
  items: any;
  count?: any;
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: any }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "ADD_EQUIPMENT_COUNT"; payload: any };

const CartContext = createContext<
  | {
      state: CartState;
      dispatch: React.Dispatch<CartAction>;
    }
  | undefined
>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        items: action.payload,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.equipment.id !== action.payload
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };
    case "ADD_EQUIPMENT_COUNT":
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
