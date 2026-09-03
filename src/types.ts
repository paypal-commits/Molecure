/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: 'cellular' | 'mitochondrial' | 'personalized' | 'defense';
  image: string;
  bgGradient: string;
  benefits: string[];
  ingredients: { name: string; dose: string; form: string; function: string }[];
  scientificExplanation: string;
  suggestedUse: string;
  warnings: string;
  faqs: { q: string; a: string }[];
  features: string[];
  subscriptionDiscount: number; // e.g. 15 for 15% off
}

export interface CartItem {
  product: Product;
  quantity: number;
  isSubscription: boolean;
  frequency?: string; // 'monthly' | 'bi-monthly'
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
}

export interface ResearchArticle {
  id: string;
  title: string;
  summary: string;
  findings: string;
  geneInvolved: string;
  biomarkers: string[];
  dietaryFactor: string;
  clinicalReference: string;
  citation: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'science' | 'supplements' | 'shipping';
}
