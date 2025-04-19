import { ITravelPackage } from '../../../redux/slices/Travel/TravelSlice';

export const mockTravelPackages: ITravelPackage[] = [
  {
    id: '1',
    title: 'Magical Goa Beach Getaway',
    description: 'Experience the stunning beaches and vibrant nightlife of Goa with this all-inclusive package.',
    price: 24999,
    originalPrice: 29999,
    image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    location: 'Goa, India',
    category: 'Beach',
    status: 'active',
    maxTravelers: 15,
    availableSpots: 8,
    travelType: 'group',
    dateAvailabilities:[]

  },
  {
    id: '2',
    title: 'Himalayan Adventure Trek',
    description: 'Challenge yourself with a breathtaking trek through the majestic Himalayas.',
    price: 32999,
    image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1585016495481-91613a3ab1bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        ],
    location: 'Manali, Himachal Pradesh',
    category: 'Adventure',
    status: 'active',
    maxTravelers: 12,
    availableSpots: 5, 
    travelType: 'group',
    dateAvailabilities:[]

  },


  {
    id: '5',
    title: 'Andaman Island Paradise',
    description: 'Discover the pristine beaches and clear waters of the Andaman Islands on this exotic getaway.',
    price: 38999,
    image: 'https://images.unsplash.com/photo-1586500038052-b3c4c575ffa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1586500038052-b3c4c575ffa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    ],
    location: 'Port Blair, Andaman',
    category: 'Beach',
    status: 'sold-out',
    maxTravelers: 15,
    availableSpots: 0,
    travelType: 'group',
    dateAvailabilities:[],
  },


  {
    id: '8',
    title: 'Ladakh Motorcycle Expedition',
    description: 'Embark on the adventure of a lifetime with a motorcycle journey through the stunning landscapes of Ladakh.',
    price: 49999,
    image: 'https://images.unsplash.com/photo-1583405298166-acc10fcdb12d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1583405298166-acc10fcdb12d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    ],
    location: 'Leh, Ladakh',
    category: 'Adventure',
    status: 'coming-soon',
    maxTravelers: 10,
    availableSpots: 10,
    travelType: 'group',
    dateAvailabilities:[]

  }
];