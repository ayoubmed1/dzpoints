// Powered by OnSpace.AI
import { api } from './api';
import { PointsTransaction, PointsResponse } from './types';

class PointsService {
  async getUserPoints(userId: string): Promise<PointsResponse> {
    try {
      // Mock implementation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const lastBonusDate = new Date();
      lastBonusDate.setDate(lastBonusDate.getDate() - 1);
      
      return {
        points: Math.floor(Math.random() * 1000) + 100,
        dailyBonusAvailable: true,
        lastBonusDate,
      };
    } catch (error) {
      throw error;
    }
  }

  async claimDailyBonus(userId: string): Promise<{ success: boolean; points: number }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const bonusPoints = 25;
      return {
        success: true,
        points: bonusPoints,
      };
    } catch (error) {
      throw error;
    }
  }

  async addPoints(userId: string, amount: number, source: string): Promise<{ success: boolean }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        success: true,
      };
    } catch (error) {
      throw error;
    }
  }

  async getTransactions(userId: string): Promise<PointsTransaction[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const mockTransactions: PointsTransaction[] = [
        {
          id: '1',
          userId,
          amount: 25,
          type: 'earned',
          source: 'daily_bonus',
          description: 'مكافأة يومية',
          createdAt: new Date(),
        },
        {
          id: '2',
          userId,
          amount: 15,
          type: 'earned',
          source: 'ad_watch',
          description: 'مشاهدة إعلان',
          createdAt: new Date(Date.now() - 86400000),
        },
        {
          id: '3',
          userId,
          amount: 100,
          type: 'spent',
          source: 'redeem',
          description: 'استبدال رصيد موبيليس',
          createdAt: new Date(Date.now() - 172800000),
        },
      ];
      
      return mockTransactions;
    } catch (error) {
      throw error;
    }
  }
}

export const pointsService = new PointsService();