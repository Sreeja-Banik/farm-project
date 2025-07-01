import { Equipment } from '../types';

const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'John Deere Tractor',
    description: 'Powerful tractor for heavy-duty farming tasks',
    daily_rate: 250,
    image_url: 'https://images.unsplash.com/photo-1605338198618-d6c99f5a5325?auto=format&fit=crop&q=80',
    category: 'tractors',
    status: 'available',
    created_at: new Date().toISOString(),
    service_areas: ['12345', '12346'],
    quantity: 5,
    quantity_available: 3,
    provider: {
      id: '1',
      name: 'Farm Equipment Co',
      contact: 'contact@farmequip.com'
    },
    availability_schedule: [
      {
        start_date: '2024-01-01',
        end_date: '2024-12-31'
      }
    ],
    additional_images: []
  }
];

export const equipmentService = {
  async getAll(): Promise<Equipment[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockEquipment];
  },

  async create(equipment: Omit<Equipment, 'id' | 'created_at'>): Promise<Equipment> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newEquipment = {
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      ...equipment
    };
    mockEquipment.push(newEquipment);
    return newEquipment;
  },

  async update(id: string, data: Partial<Equipment>): Promise<Equipment> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockEquipment.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Equipment not found');
    
    mockEquipment[index] = { ...mockEquipment[index], ...data };
    return mockEquipment[index];
  },

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockEquipment.findIndex(e => e.id === id);
    if (index !== -1) {
      mockEquipment.splice(index, 1);
    }
  }
};