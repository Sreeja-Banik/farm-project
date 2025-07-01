import { useCart as useCartContext } from "../components/cart/CartContext";
import { Equipment } from "../types";
import toast from "react-hot-toast";
import { useAuth } from "../components/auth/AuthContext";
import React from "react";
import axios from "axios";

export function useCart() {
  const { state, dispatch } = useCartContext();
  // const { token } = useAuth();

  // const onAddToCart = React.useCallback(
  //   async (data: any) => {
  //     console.log("data555555", data);
  //     try {
  //       const response = await axios.post(
  //         `http://localhost:5000/cart/add`,
  //         data,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`, // Include the token in the header
  //           },
  //         }
  //       );
  //     } catch (error) {
  //       console.error("Failed to add to cart", error);
  //     }
  //   },
  //   [token]
  // );

  const addToCart = (data: any) => {
    // console.log("equipment", equipment, "startDate", startDate, endDate);
    // let data = {
    //   equipmentId: equipment?._id,
    //   startDate: startDate,
    //   endDate: endDate,
    //   quantity: 1,
    // };
    // console.log("data", data);
    // onAddToCart(data);
    dispatch({
      type: "ADD_TO_CART",
      payload: { data },
    });
    // toast.success("Added to cart successfully!");
  };

  const removeFromCart = (equipmentId: string) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: equipmentId,
    });
    toast.success("Item removed from cart");
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast.success("Cart cleared");
  };

  const addEquipmentCount = (equipmentCount: any) => {
    dispatch({
      type: "ADD_EQUIPMENT_COUNT",
      payload: equipmentCount,
    });
  };

  return {
    cardCount: state.count,
    items: state.items,
    addToCart,
    removeFromCart,
    clearCart,
    addEquipmentCount,
  };
}
