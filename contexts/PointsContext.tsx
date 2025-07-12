// Powered by OnSpace.AI
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { pointsService } from '../services/pointsService';
import { useAuth } from './AuthContext';
import { PointsTransaction } from '../services/types';

interface PointsContextType {
  points: number;
  dailyBonus: boolean;
  transactions: PointsTransaction[];
  loading: boolean;
  refreshPoints: () => Promise<void>;
  claimDailyBonus: () => Promise<boolean>;
  addPoints: (amount: number, source: string) => Promise<boolean>;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};

interface PointsProviderProps {
  children: ReactNode;
}

export const PointsProvider: React.FC<PointsProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [dailyBonus, setDailyBonus] = useState(false);
  const [transactions, setTransactions] = useState<PointsTransaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      refreshPoints();
    }
  }, [user]);

  const refreshPoints = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const pointsData = await pointsService.getUserPoints(user.id);
      setPoints(pointsData.points);
      setDailyBonus(pointsData.dailyBonusAvailable);
      
      const transactionsData = await pointsService.getTransactions(user.id);
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Error refreshing points:', error);
    } finally {
      setLoading(false);
    }
  };

  const claimDailyBonus = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const response = await pointsService.claimDailyBonus(user.id);
      if (response.success) {
        setPoints(prev => prev + response.points);
        setDailyBonus(false);
        await refreshPoints();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error claiming daily bonus:', error);
      return false;
    }
  };

  const addPoints = async (amount: number, source: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const response = await pointsService.addPoints(user.id, amount, source);
      if (response.success) {
        setPoints(prev => prev + amount);
        await refreshPoints();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding points:', error);
      return false;
    }
  };

  const value: PointsContextType = {
    points,
    dailyBonus,
    transactions,
    loading,
    refreshPoints,
    claimDailyBonus,
    addPoints,
  };

  return <PointsContext.Provider value={value}>{children}</PointsContext.Provider>;
};