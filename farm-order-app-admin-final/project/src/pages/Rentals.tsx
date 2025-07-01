import React, { useState, useEffect } from "react";
import { dataService } from "../lib/mockData";
import { RentalList } from "../components/RentalList";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageHeader } from "../components/PageHeader";
// import type { Rental } from '../types';
import toast from "react-hot-toast";
import axios from "axios";

export const RentalsPage = () => {
  const [rentals, setRentals] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetchRentals();
    getRentals();
  }, []);

  const getRentals = React.useCallback(async () => {
    setLoading(false);
    try {
      const { data } = await axios.get(`http://localhost:5000/api/orders/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (data) {
        setRentals(data);
      }
    } catch (e: any) {
      console.log("error", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRentalStatus = React.useCallback(
    async (id: string, status: "approved" | "rejected") => {
      setLoading(false);
      try {
        let url: string;
        if (status === "approved") {
          // url = `http://localhost:5000/api/orders/approve/${id}`;
          const { data } = await axios.put(
            `http://localhost:5000/api/orders/approve/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (data) {
            toast.success(`Rental ${status} successfully`);
            getRentals();
          }
        } else {
          // url = `http://localhost:5000/api/orders/reject/${id}`;
          const { data } = await axios.put(
            `http://localhost:5000/api/orders/reject/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (data) {
            toast.success(`Rental ${status} successfully`);
            getRentals();
          }
        }
        // const { data } = await axios.put(url, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // });
        // if (data) {
        //   toast.success(`Rental ${status} successfully`);
        //   getRentals();
        // }
      } catch (e: any) {
        toast.error(`Failed to ${status} rental`);
        console.log("error", e);
      } finally {
        setLoading(false);
      }
    },
    []
  );
  // const fetchRentals = async () => {
  //   try {
  //     const data = await dataService.getRentals();
  //     // setRentals(data);
  //   } catch (error) {
  //     toast.error("Failed to fetch rentals");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleUpdateStatus = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    try {
      await dataService.updateRentalStatus(id, status);
      setRentals((prev) =>
        prev.map((rental) =>
          rental.id === id ? { ...rental, status } : rental
        )
      );
      toast.success(`Rental ${status} successfully`);
    } catch (error) {
      toast.error(`Failed to ${status} rental`);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <PageHeader title="Rental Management" />
      <RentalList rentals={rentals} onUpdateStatus={updateRentalStatus} />
    </div>
  );
};
