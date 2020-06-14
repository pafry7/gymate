export interface Offer {
  id: number;
  name: string;
  description: string;
  singlePrice: number;
  isFirstFree: boolean;
  dates: Number[];
  providerId: number;
  address: {
    city: string;
    coords: {
      latitude: number;
      longitude: number;
    };
  };
}

export const disciplines = [
  "MMA",
  "Swimming",
  "Boxing",
  "Climbing",
  "Gym",
  "Tennis",
  "Ping pong",
];

export const offers: Offer[] = [
  {
    id: 1,
    name: "Tennis",
    description: "test",
    singlePrice: 50,
    isFirstFree: false,
    dates: [1577833200000, 1577887200000],
    providerId: 4,
    address: {
      city: "Kraków",
      coords: { latitude: 50.082536, longitude: 19.972502 },
    },
  },
  {
    id: 2,
    name: "MMA",
    description: "Zajęcia dla wszystkich",
    singlePrice: 20,
    isFirstFree: true,
    dates: [1577833200000, 1577887200000],
    providerId: 2,
    address: {
      city: "Kraków",
      coords: { latitude: 50.082958, longitude: 19.998129 },
    },
  },
  {
    id: 3,
    name: "Climbing",
    description: "test",
    singlePrice: 10,
    isFirstFree: false,
    dates: [1577833200000, 1577887200000],
    providerId: 4,
    address: {
      city: "Kraków",
      coords: { latitude: 50.081976, longitude: 19.969829 },
    },
  },
  {
    id: 4,
    name: "Boxing",
    description: "test",
    singlePrice: 10,
    isFirstFree: false,
    dates: [1577833200000, 1577887200000],
    providerId: 4,
    address: {
      city: "Kraków",
      coords: { latitude: 50.080958, longitude: 19.968129 },
    },
  },
  {
    id: 5,
    name: "Ping pong",
    description: "test",
    singlePrice: 10,
    isFirstFree: false,
    dates: [1577833200000, 1577887200000],
    providerId: 4,
    address: {
      city: "Kraków",
      coords: { latitude: 50.079938, longitude: 19.989212 },
    },
  },
  {
    id: 6,
    name: "Gym",
    description: "test",
    singlePrice: 10,
    isFirstFree: false,
    dates: [1577833200000, 1577887200000],
    providerId: 4,
    address: {
      city: "Kraków",
      coords: { latitude: 50.080222, longitude: 19.989122 },
    },
  },
  {
    id: 7,
    name: "Swimming",
    description: "test",
    singlePrice: 10,
    isFirstFree: false,
    dates: [1577833200000, 1577887200000],
    providerId: 4,
    address: {
      city: "Kraków",
      coords: { latitude: 50.078212, longitude: 19.991222 },
    },
  },
  {
    id: 8,
    name: "Swimming",
    description: "test",
    singlePrice: 10,
    isFirstFree: false,
    dates: [1577833200000, 1577887200000],
    providerId: 4,
    address: {
      city: "Kraków",
      coords: { latitude: 50.083212, longitude: 19.992121 },
    },
  },
  {
    id: 9,
    name: "MMA",
    description: "test",
    singlePrice: 10,
    isFirstFree: false,
    dates: [1577833200000, 1577887200000],
    providerId: 4,
    address: {
      city: "Kraków",
      coords: { latitude: 50.0829212, longitude: 19.998121 },
    },
  },
  {
    id: 10,
    name: "Gym",
    description: "MCFIT",
    singlePrice: 10,
    isFirstFree: false,
    dates: [1577833200000, 1577887200000],
    providerId: 4,
    address: {
      city: "Kraków",
      coords: { latitude: 50.082228, longitude: 19.999999 },
    },
  },
];
