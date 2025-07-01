import React, { useState, useMemo } from "react";
// import { mockEquipment } from "./data/mockEquipment";
import { Equipment, Order } from "./types";
import toast from "react-hot-toast";
import { Header } from "./components/Header";
import { CartModal } from "./components/cart/CartModal";
import { OrderModal } from "./components/orders/OrderModal";
import { AuthModal } from "./components/auth/AuthModal";
import { EquipmentDetails } from "./components/equipment/EquipmentDetails";
import { StickyFilterBar } from "./components/filters/StickyFilterBar";
import { EquipmentCard } from "./components/EquipmentCard";
import { useCart } from "./hooks/useCart";
import { CheckoutModal } from "./components/checkout/CheckoutModal";
import { useAuth } from "./components/auth/AuthContext";
import { RentalForm } from "./components/RentalForm";
import axios from "axios";
import ChatAssistant from "./components/chat/ChatAssistant.tsx";

export default function App() {
  const [selectedEquipment, setSelectedEquipment] = useState<any | null>(null);
  const [showRentalForm, setShowRentalForm] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "price">("date");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [mockEquipment, seMockEquipment] = useState<any[]>([]);

  const { addToCart, addEquipmentCount } = useCart();
  const { isAuthenticated, token } = useAuth();

  const onLoadEEquipment = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/equipment`);
      // return data;
      // console.log(data);
      seMockEquipment(data);
    } catch (e: any) {
      toast.error("Something went Wrong!");
      return e?.response;
    }
  }, []);

  const onLoadEquipmentCount = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/cart/count`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });
      if (data) {
        addEquipmentCount(data.itemCount);
      }
    } catch (e: any) {
      // toast.error("Something went Wrong!");
      // return e?.response;
      console.log("error", e);
    }
  }, []);

  const onLoadCartEquipment = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });
      // return data;
      if (data) {
        addToCart(data);
      }
      // setItems(data);
    } catch (e: any) {
      toast.error("Something went wrong");
      // return e?.response;
    }
  }, []);

  // const onPlaceOrder = React.useCallback(async () => {
  //   try {
  //     const { data } = await axios.get(`http://localhost:5000/api/cart`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Include the token in the header
  //       },
  //     });
  //     // return data;
  //     if (data) {
  //       addToCart(data);
  //     }
  //     // setItems(data);
  //   } catch (e: any) {
  //     toast.error("Something went wrong");
  //     // return e?.response;
  //   }
  // }, []);

  React.useEffect(() => {
    onLoadEEquipment();
    onLoadEquipmentCount();
    onLoadCartEquipment();
  }, []);

  // Filter and sort equipment
  // const filteredEquipment = useMemo(() => {
  //   return mockEquipment
  //     .filter((equipment) => {
  //       const matchesSearch =
  //         equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         equipment.description
  //           .toLowerCase()
  //           .includes(searchTerm.toLowerCase());
  //       const matchesCategory =
  //         selectedCategories.length === 0 ||
  //         selectedCategories.includes(equipment.category);
  //       const matchesPrice =
  //         equipment.dailyRate >= priceRange[0] &&
  //         equipment.dailyRate <= priceRange[1];

  //       return matchesSearch && matchesCategory && matchesPrice;
  //     })
  //     .sort((a, b) => {
  //       if (sortBy === "price") {
  //         return a.dailyRate - b.dailyRate;
  //       }
  //       return (
  //         new Date(a.availableFrom).getTime() -
  //         new Date(b.availableFrom).getTime()
  //       );
  //     });
  // }, [searchTerm, selectedCategories, priceRange, sortBy, mockEquipment]);

  // let filteredEquipment = mockEquipment
  //   .filter((equipment) => {
  //     const matchesSearch =
  //       equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       equipment.description.toLowerCase().includes(searchTerm.toLowerCase());
  //     const matchesCategory =
  //       selectedCategories.length === 0 ||
  //       selectedCategories.includes(equipment.category);
  //     const matchesPrice =
  //       equipment.dailyRate >= priceRange[0] &&
  //       equipment.dailyRate <= priceRange[1];

  //     return matchesSearch && matchesCategory && matchesPrice;
  //   })
  //   .sort((a, b) => {
  //     if (sortBy === "price") {
  //       return a.dailyRate - b.dailyRate;
  //     }
  //     return (
  //       new Date(a.availableFrom).getTime() -
  //       new Date(b.availableFrom).getTime()
  //     );
  //   });

  const onPlaceOrder = React.useCallback(
    async (orders: any) => {
      if (!isAuthenticated) {
        toast.error("You need to be logged in to place an order");
        return;
      }
      try {
        // Retrieve token (adjust based on where the token is stored)
        // const token = localStorage.getItem("token"); // Example: From localStorage
        if (!token) {
          toast.error("No authentication token found. Please log in again.");
          return;
        }
        // Make API call with Authorization header
        const { data } = await axios.post(
          `http://localhost:5000/api/orders`,
          orders,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the header
            },
          }
        );
        if (data) {
          onLoadCartEquipment();
          onLoadEquipmentCount();
        }
        return data;
      } catch (e: any) {
        toast.error(
          "Something went wrong! \n Please try again later \n Order not placed"
        );
        return e?.response;
      }
    },
    [isAuthenticated, token]
  );

  const handleAddToCart = (equipment: Equipment) => {
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }
    setSelectedEquipment(equipment);
    setShowRentalForm(true);
  };

  const onAddToCart = React.useCallback(
    async (data: any) => {
      // console.log("data555555", data);
      try {
        const response = await axios.post(
          `http://localhost:5000/api/cart/add`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the header
            },
          }
        );
        if (response) {
          onLoadEquipmentCount();
        }
      } catch (error) {
        console.error("Failed to add to cart", error);
      }
    },
    [token]
  );

  const handleRentalSubmit = async (startDate: string, endDate: string) => {
    if (selectedEquipment) {
      let data = {
        // equipment: [{ equipmentId: selectedEquipment?.id, quantity: 1 }],
        startDate: startDate,
        endDate: endDate,
        quantity: 1,
        equipmentId: selectedEquipment?._id,
      };
      await onAddToCart(data);
      // addToCart(selectedEquipment, startDate, endDate);
      setShowRentalForm(false);
      setSelectedEquipment(null);
      toast.success("Added to cart!");
    }
  };

  const handleQuickCheckout = (equipment: Equipment) => {
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }
    setSelectedEquipment(equipment);
    setShowCheckout(true);
  };

  const handleCheckout = (order: Order) => {
    setOrders([...orders, order]);
    setShowCheckout(false);
    toast.success("Order placed successfully!");
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSortBy("date");
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCartClick={() => setShowCart(true)}
        onOrdersClick={() => setShowOrders(true)}
        setLoginModalOpen={() => setShowAuth(true)}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <StickyFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onClearFilters={handleClearFilters}
        />

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* {filteredEquipment.map((equipment) => ( */}
          {mockEquipment.map((equipment) => (
            <EquipmentCard
              key={equipment._id}
              equipment={equipment}
              onRent={handleAddToCart}
              onQuickCheckout={handleQuickCheckout}
              onClick={() => setSelectedEquipment(equipment)}
              onRequestLogin={() => setShowAuth(true)}
            />
          ))}
        </div>
      </main>

      {selectedEquipment && !showRentalForm && !showCheckout && (
        <EquipmentDetails
          equipment={selectedEquipment}
          onClose={() => setSelectedEquipment(null)}
          onRent={handleAddToCart}
          onRequestLogin={() => setShowAuth(true)}
        />
      )}

      {showRentalForm && selectedEquipment && (
        <RentalForm
          equipment={selectedEquipment}
          onSubmit={handleRentalSubmit}
          onClose={() => setShowRentalForm(false)}
          onRequestLogin={() => setShowAuth(true)}
        />
      )}

      {showCart && (
        <CartModal
          onRemove={() => {
            onLoadEquipmentCount();
          }}
          onClose={() => setShowCart(false)}
          onCheckout={() => {
            if (!isAuthenticated) {
              setShowAuth(true);
              return;
            }
            setShowCart(false);
            setShowCheckout(true);
          }}
        />
      )}

      {showOrders && (
        <OrderModal
          // orders={orders}
          onClose={() => setShowOrders(false)}
          onCancelOrder={(id) => {
            setOrders(orders.filter((order) => order.id !== id));
            toast.success("Order cancelled successfully");
          }}
        />
      )}

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => {
            setShowAuth(false);
            toast.success("Logged in successfully!");
          }}
        />
      )}

      {showCheckout && (
        <CheckoutModal
          onClose={() => setShowCheckout(false)}
          onComplete={async (e) => {
            console.log("CheckoutModal", e);
            await onPlaceOrder(e);
            handleCheckout(e);
          }}
        />
      )}
      <ChatAssistant />
    </div>
  );
}
