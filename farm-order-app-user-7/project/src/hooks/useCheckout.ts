import { useState } from "react";
import { useCart } from "./useCart";
import { Order, UserDetails, PaymentMethod } from "../types";

export function useCheckout() {
  const [step, setStep] = useState<"details" | "payment">("details");
  const { items, clearCart } = useCart();
  console.log("processCheckout", items.data.equipments);
  const calculateTotal = () => {
    // return;
    return items.data.equipments.reduce((total, item) => {
      const days = Math.ceil(
        (new Date(item.endDate).getTime() -
          new Date(item.startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      return total + days * item.equipments.dailyRate;
    }, 0);
  };

  function transformEquipmentData(data: any[]): any[] {
    return data.map((item) => ({
      equipmentId: parseInt(item.equipment.id, 10), // Convert ID to number
      quantity: 1, // Default quantity is 1
    }));
  }

  const processCheckout = (
    userDetails: UserDetails,
    paymentMethod: PaymentMethod
  ): any => {
    console.log("Processing checkout", items, userDetails, paymentMethod);
    // const order: Order = {
    //   id: Math.random().toString(36).substr(2, 9),
    //   equipment: transformEquipmentData(items),
    //   startDate: items[0].startDate,
    //   endDate: items[0].endDate,
    //   totalAmount: calculateTotal(),
    //   status: "pending",
    //   userDetails,
    //   paymentMethod,
    //   contactInfo: {
    //     name: userDetails?.fullName,
    //     phone: userDetails?.phone,
    //     email: userDetails?.email,
    //   },
    //   deliveryInfo: {
    //     address: userDetails?.address.street,
    //     city: userDetails?.address.city,
    //     state: userDetails?.address.state,
    //     zipCode: userDetails?.address.zipCode,
    //   },
    // };

    // In a real app, this would make an API call to process payment and create order
    // clearCart();
    // return order;
    const orderData = {
      cartId: items.data._id,
      contactInfo: {
        name: userDetails.fullName,
        phone: userDetails.phone,
        email: userDetails.email,
      },
      deliveryInfo: {
        address: userDetails.address.street,
        city: userDetails.address.city,
        state: userDetails.address.state,
        zipCode: userDetails.address.zipCode,
      },
      paymentMethod: paymentMethod.type,
    };
    console.log("orderData", orderData);
    return orderData;
  };

  return {
    step,
    setStep,
    calculateTotal,
    processCheckout,
  };
}
