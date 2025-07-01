import React from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { Order } from "../types";
import axios from "axios";

interface Props {
  orders: Order[];
}

export function OrderTracker({ orders }: Props) {
  const [orders2, setOrders] = React.useState<any[]>([]);
  const onLoadOrders = React.useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to load orders", error);
    }
  }, []);

  React.useEffect(() => {
    onLoadOrders();
  }, [onLoadOrders]);

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Order #{order.id}</span>
              <div className="flex items-center gap-2">
                {getStatusIcon(order.status)}
                <span className="capitalize">{order.status}</span>
              </div>
            </div>
            <div className="text-gray-600">
              <p>
                Rental Period: {new Date(order.startDate).toLocaleDateString()}{" "}
                - {new Date(order.endDate).toLocaleDateString()}
              </p>
              <p>Total Amount: ${order.totalAmount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
