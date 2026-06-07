/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Room {
  id: string;
  title: string;
  price: number;
  image: string;
  capacity: number;
  size: number; // in square meters
  view: string;
  amenities: string[];
  description: string;
}

export interface AmenityItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: "food" | "beverage" | "dessert";
  price: number;
  description: string;
  image: string;
  isPopular?: boolean;
}

export interface TourItem {
  id: string;
  title: string;
  price: number;
  duration: string;
  image: string;
  description: string;
  highlights: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  roomType?: string;
}

export interface BookingDetails {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  breakfastIncluded: boolean;
  airportTransfer: boolean;
  fullName: string;
  phone: string;
  email: string;
}
