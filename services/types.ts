// Powered by OnSpace.AI
export interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
  wilaya: string;
  points: number;
  referralCode: string;
  createdAt: Date;
  lastLoginAt: Date;
  isActive: boolean;
}

export interface PointsTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earned' | 'spent';
  source: string;
  description: string;
  createdAt: Date;
}

export interface RedeemOption {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  category: 'mobile' | 'internet' | 'gift';
  provider: 'djezzy' | 'mobilis' | 'ooredoo' | 'other';
  value: string;
  isActive: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'ad_watch' | 'referral' | 'daily_bonus' | 'survey';
  isActive: boolean;
  requirements?: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export interface PointsResponse {
  points: number;
  dailyBonusAvailable: boolean;
  lastBonusDate?: Date;
}