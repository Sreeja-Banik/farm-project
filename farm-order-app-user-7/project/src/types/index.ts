// ... (keep existing interfaces)

// export interface Equipment {
//   id: string;
//   name: string;
//   category: string;
//   dailyRate: number;
//   description: string;
//   imageUrl: string;
//   available: boolean;
//   availableFrom: string;
//   availableTo: string;
//   specifications?: {
//     power?: string;
//     weight?: string;
//     width?: string;
//   };
// }

export interface UserDetails {
  fullName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface PaymentMethod {
  type: "credit_card" | "debit_card" | "bank_transfer" | "upi";
  lastFourDigits?: string;
  upiId?: string;
}

export interface Order {
  id: string;
  equipment: any[];
  // equipmentId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  userDetails: UserDetails;
  paymentMethod: PaymentMethod;
  contactInfo: any;
  deliveryInfo: any;
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  dailyRate: number;
  description: string;
  imageUrl: string;
  available: boolean;
  availableFrom: string;
  availableTo: string;
  specifications?: {
    power?: string;
    weight?: string;
    width?: string;
  };
  reviews?: Review[];
}
