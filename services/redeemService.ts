// Powered by OnSpace.AI
import { api } from './api';
import { RedeemOption } from './types';

class RedeemService {
  async getRedeemOptions(): Promise<RedeemOption[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockOptions: RedeemOption[] = [
        {
          id: '1',
          title: 'رصيد جيزي 100 دج',
          description: 'إعادة شحن رصيد جيزي بقيمة 100 دينار جزائري',
          pointsRequired: 200,
          category: 'mobile',
          provider: 'djezzy',
          value: '100 DZD',
          isActive: true,
        },
        {
          id: '2',
          title: 'رصيد موبيليس 100 دج',
          description: 'إعادة شحن رصيد موبيليس بقيمة 100 دينار جزائري',
          pointsRequired: 200,
          category: 'mobile',
          provider: 'mobilis',
          value: '100 DZD',
          isActive: true,
        },
        {
          id: '3',
          title: 'رصيد أوريدو 100 دج',
          description: 'إعادة شحن رصيد أوريدو بقيمة 100 دينار جزائري',
          pointsRequired: 200,
          category: 'mobile',
          provider: 'ooredoo',
          value: '100 DZD',
          isActive: true,
        },
        {
          id: '4',
          title: 'باقة إنترنت جيزي 5GB',
          description: 'باقة إنترنت جيزي 5 جيجابايت صالحة لشهر واحد',
          pointsRequired: 300,
          category: 'internet',
          provider: 'djezzy',
          value: '5GB',
          isActive: true,
        },
        {
          id: '5',
          title: 'باقة إنترنت موبيليس 3GB',
          description: 'باقة إنترنت موبيليس 3 جيجابايت صالحة لشهر واحد',
          pointsRequired: 250,
          category: 'internet',
          provider: 'mobilis',
          value: '3GB',
          isActive: true,
        },
      ];
      
      return mockOptions;
    } catch (error) {
      throw error;
    }
  }

  async redeemPoints(userId: string, optionId: string, phoneNumber: string): Promise<{
    success: boolean;
    message: string;
    transactionId?: string;
  }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return {
        success: true,
        message: 'تم تنفيذ طلب الاستبدال بنجاح. سيتم تحويل الرصيد خلال 24 ساعة.',
        transactionId: 'TXN_' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      };
    } catch (error) {
      return {
        success: false,
        message: 'حدث خطأ أثناء معالجة طلب الاستبدال. حاول مرة أخرى.',
      };
    }
  }
}

export const redeemService = new RedeemService();