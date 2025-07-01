import React from "react";
import { X, CheckCircle, Clock, XCircle } from "lucide-react";
import { Order } from "../../types";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

interface Props {
  // orders: Order[];
  onClose: () => void;
  onCancelOrder: (orderId: string) => void;
}

export function OrderModal({ onClose, onCancelOrder }: Props) {
  const { isAuthenticated, token } = useAuth();
  const [orders, setOrders] = React.useState<any[]>([]);
  const onLoadOrders = React.useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to load orders", error);
    }
  }, [token]);

  const onMakeCancelOrder = React.useCallback(async (orderId: string) => {
    // console.log("onMakeCancelOrder", orderId);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        }
      );
      // setOrders(orders.filter((order) => order.id !== orderId));
      if (response.status === 200) {
        onLoadOrders();
      }
    } catch (error) {
      console.error("Failed to cancel order", error);
    }
  }, []);

  React.useEffect(() => {
    onLoadOrders();
  }, [onLoadOrders]);
  const handleCancelOrder = (orderId: string) => {
    onMakeCancelOrder(orderId);
    // onCancelOrder(orderId);
    toast.success("Order cancelled successfully");
  };
  const getStatusIcon = (status: any) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Your Orders</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Order #{order._id}</span>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                </div>
                <div className="text-gray-600">
                  <p>
                    Rental Period:{" "}
                    {new Date(
                      order.equipment[0].startDate
                    ).toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(order.equipment[0].endDate).toLocaleDateString()}
                  </p>
                  <p>Total Amount: ₹ {order.totalAmount}</p>
                  <p>Quantity : {order.equipment[0].quantity}</p>
                </div>
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={order.equipment[0].equipmentId.imageUrl}
                    alt={order.equipment[0].equipmentId.name}
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {order.equipment[0].equipmentId.name}
                    </div>
                  </div>
                </div>
                {order.status === "pending" ? (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      Cancel Order
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
