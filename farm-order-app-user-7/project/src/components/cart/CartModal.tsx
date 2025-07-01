import React from "react";
import { X, Trash2 } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../auth/AuthContext";

interface Props {
  onClose: () => void;
  onCheckout: () => void;
  onRemove: () => void;
}

export function CartModal({ onClose, onCheckout, onRemove }: Props) {
  const { token } = useAuth();
  const {
    // items,
    removeFromCart,
  } = useCart();
  const [items, setItems] = React.useState<any>([]);

  const onLoadEEquipment = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });
      // return data;
      setItems(data);
    } catch (e: any) {
      toast.error("Something went wrong");
      // return e?.response;
    }
  }, []);

  const onDeleteFromCart = React.useCallback(async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/cart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        }
      );
      // return data;
      if (data) {
        onLoadEEquipment();
        onRemove();
        toast.success("Item removed from cart");
      }
    } catch (e: any) {
      toast.error("Something went wrong");
      // return e?.response;
    }
  }, []);

  React.useEffect(() => {
    onLoadEEquipment();
  }, []);

  const calculateTotal = () => {
    return items.equipments.reduce((total, item) => {
      const days = Math.ceil(
        (new Date(item.endDate).getTime() -
          new Date(item.startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      // console.log("days", days, "dailyRate", item.equipments.dailyRate);
      return total + days * item.equipments.dailyRate;
    }, 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {items.equipments && items.equipments.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {items.equipments?.map((item: any, index: number) => (
                <div
                  key={`${item.equipmentId}-${index}`}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <img
                    src={item.equipments.imageUrl}
                    alt={item.equipments.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.equipments.name}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(item.startDate).toLocaleDateString()} -{" "}
                      {new Date(item.endDate).toLocaleDateString()}
                    </p>
                    <p className="font-medium">
                      ${item.equipments.dailyRate}/day
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onDeleteFromCart(item.equipmentId);
                      // removeFromCart(item.equipmentId);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items?.equipments && items.equipments.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="text-xl font-bold">${calculateTotal()}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
