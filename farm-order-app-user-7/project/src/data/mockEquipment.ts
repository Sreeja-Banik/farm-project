import { Equipment } from "../types";

export const mockEquipment: any[] = [
  {
    id: "1",
    name: "John Deere 8R Tractor",
    category: "Tractor",
    dailyRate: 350,
    description:
      "High-performance row crop tractor with advanced precision technology",
    imageUrl:
      "https://images.unsplash.com/photo-1605338803155-8b46c2edc818?auto=format&fit=crop&w=800",
    available: true,
    availableFrom: "2024-03-20",
    availableTo: "2024-12-31",
    specifications: {
      power: "410 HP",
      weight: "31,000 lbs",
    },
  },
  {
    id: "2",
    name: "Case IH Harvester",
    category: "Harvester",
    dailyRate: 450,
    description: "Advanced combine harvester with automated threshing system",
    imageUrl:
      "https://images.unsplash.com/photo-1591638246754-77e0571e6d24?auto=format&fit=crop&w=800",
    available: true,
    availableFrom: "2024-03-20",
    availableTo: "2024-12-31",
    specifications: {
      width: "40 ft",
      power: "500 HP",
    },
  },
  {
    id: "3",
    name: "Kubota Compact Tractor",
    category: "Tractor",
    dailyRate: 180,
    description:
      "Versatile compact tractor perfect for small farms and landscaping",
    imageUrl:
      "https://images.unsplash.com/photo-1599619585752-c3edb42a414c?auto=format&fit=crop&w=800",
    available: true,
    availableFrom: "2024-03-22",
    availableTo: "2024-12-31",
    specifications: {
      power: "47 HP",
      weight: "3,800 lbs",
    },
  },
  {
    id: "4",
    name: "Modern Seed Drill",
    category: "Seeder",
    dailyRate: 220,
    description: "Precision seeding equipment with variable rate technology",
    imageUrl:
      "https://images.unsplash.com/photo-1589345833208-087c6f20cb95?auto=format&fit=crop&w=800",
    available: true,
    availableFrom: "2024-03-25",
    availableTo: "2024-12-31",
    specifications: {
      width: "20 ft",
      weight: "4,200 lbs",
    },
  },
  {
    id: "5",
    name: "Sprinkler Irrigation System",
    category: "Irrigation",
    dailyRate: 150,
    description: "Mobile irrigation system with adjustable spray patterns",
    imageUrl:
      "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800",
    available: true,
    availableFrom: "2024-03-20",
    availableTo: "2024-12-31",
    specifications: {
      width: "30 ft",
    },
  },
  {
    provider: {
      id: "677d3b4c9e182f1573f2451d",
      name: "exampleUser",
      contact: "",
    },
    specifications: {
      power: "sssdd",
      weight: "dd",
      width: "dd",
    },
    _id: "677e9e6545b92e975c7aec4a",
    name: "sssss",
    description: "sfsfsfsf",
    category: "Excavator",
    dailyRate: 4,
    imageUrl: "sssdddd",
    additionalImages: [],
    status: "available",
    serviceAreas: ["55555"],
    quantity: 1,
    quantityAvailable: 1,
    availabilitySchedule: [
      {
        startDate: "2025-01-15T00:00:00.000Z",
        endDate: "2025-01-22T00:00:00.000Z",
        _id: "677e9e6545b92e975c7aec4b",
      },
    ],
    createdAt: "2025-01-08T15:48:53.401Z",
    reviews: [],
    __v: 0,
  },
];
