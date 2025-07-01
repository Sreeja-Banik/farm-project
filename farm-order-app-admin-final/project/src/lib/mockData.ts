import type { Equipment, Rental } from '../types';

// Initial mock data
export const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'John Deere Tractor',
    description: 'Powerful tractor for heavy-duty farming tasks',
    daily_rate: 250,
    image_url: 'https://images.unsplash.com/photo-1605338198618-d6c99f5a5325?auto=format&fit=crop&q=80',
    category: 'tractors',
    status: 'available',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Harvester Combine',
    description: 'Modern combine for efficient crop harvesting',
    daily_rate: 350,
    image_url: 'https://images.unsplash.com/photo-1591086559708-b6f3d2c95cdc?auto=format&fit=crop&q=80',
    category: 'harvesters',
    status: 'rented',
    created_at: new Date().toISOString()
  }
];

export const mockRentals: Rental[] = [
  {
    id: '1',
    equipment_id: '1',
    user_id: 'user1',
    start_date: '2024-03-01',
    end_date: '2024-03-05',
    status: 'pending',
    total_amount: 1250,
    created_at: new Date().toISOString(),
    equipment: mockEquipment[0],
    user: {
      email: 'john@example.com',
      full_name: 'John Farmer'
    }
  }
];

// Mock data service
class MockDataService {
  private equipment: Equipment[] = [...mockEquipment];
  private rentals: Rental[] = [...mockRentals];

  // Equipment methods
  async getEquipment(): Promise<Equipment[]> {
    return [...this.equipment];
  }

  async deleteEquipment(id: string): Promise<void> {
    this.equipment = this.equipment.filter(item => item.id !== id);
  }

  async updateEquipment(equipment: Equipment): Promise<Equipment> {
    this.equipment = this.equipment.map(item => 
      item.id === equipment.id ? equipment : item
    );
    return equipment;
  }

  // Rental methods
  async getRentals(): Promise<Rental[]> {
    return [...this.rentals];
  }

  async updateRentalStatus(id: string, status: 'approved' | 'rejected'): Promise<void> {
    this.rentals = this.rentals.map(rental =>
      rental.id === id ? { ...rental, status } : rental
    );
  }
}

export const dataService = new MockDataService();