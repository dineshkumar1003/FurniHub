export type Category =
  | "sofas"
  | "beds"
  | "dining"
  | "chairs"
  | "wardrobes"
  | "office";

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: Category;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image: string;
  gallery?: string[];
  colors: string[];
  material: string;
  craftsmanship: string;
  dimensions: string;
  care: string;
  description: string;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  collection?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  isAdmin?: boolean;
  token?: string;
}

export interface ApiProduct {
  _id: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  house: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}