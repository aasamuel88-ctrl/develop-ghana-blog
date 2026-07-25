/**
 * Core type definitions for Develop Ghana Lab
 * Expanded in later phases (Auth, Products, Blog, Payments)
 */

export type UserRole = 'user' | 'admin' | 'developer' | 'editor';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // GHS
  currency: 'GHS';
  imageUrl?: string;
  isPublished: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  publishedAt?: string;
}
