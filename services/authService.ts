// Powered by OnSpace.AI
import { api } from './api';
import { User, AuthResponse } from './types';

class AuthService {
  async login(phone: string, password: string): Promise<AuthResponse> {
    try {
      // Mock implementation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      const mockUser: User = {
        id: '1',
        phone,
        name: 'مستخدم تجريبي',
        wilaya: 'الجزائر',
        points: 150,
        referralCode: 'DZ' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        createdAt: new Date(),
        lastLoginAt: new Date(),
        isActive: true,
      };

      return {
        success: true,
        user: mockUser,
        token: 'mock_token_' + Math.random().toString(36),
      };
    } catch (error) {
      return {
        success: false,
        message: 'خطأ في تسجيل الدخول',
      };
    }
  }

  async register(userData: {
    phone: string;
    password: string;
    name: string;
    wilaya: string;
    referralCode?: string;
  }): Promise<AuthResponse> {
    try {
      // Mock implementation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser: User = {
        id: Math.random().toString(36).substring(2),
        phone: userData.phone,
        name: userData.name,
        wilaya: userData.wilaya,
        points: 50, // Welcome bonus
        referralCode: 'DZ' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        createdAt: new Date(),
        lastLoginAt: new Date(),
        isActive: true,
      };

      return {
        success: true,
        user: newUser,
        token: 'mock_token_' + Math.random().toString(36),
      };
    } catch (error) {
      return {
        success: false,
        message: 'خطأ في إنشاء الحساب',
      };
    }
  }

  async updateProfile(userId: string, userData: Partial<User>): Promise<AuthResponse> {
    try {
      // Mock implementation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        success: true,
        user: userData as User,
      };
    } catch (error) {
      return {
        success: false,
        message: 'خطأ في تحديث الملف الشخصي',
      };
    }
  }

  async forgotPassword(phone: string): Promise<{ success: boolean; message: string }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        message: 'تم إرسال رمز التحقق إلى هاتفك',
      };
    } catch (error) {
      return {
        success: false,
        message: 'خطأ في إرسال رمز التحقق',
      };
    }
  }
}

export const authService = new AuthService();