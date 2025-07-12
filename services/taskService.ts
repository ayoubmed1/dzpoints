// Powered by OnSpace.AI
import { api } from './api';
import { Task } from './types';

class TaskService {
  async getAvailableTasks(userId: string): Promise<Task[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'شاهد إعلان وربح نقاط',
          description: 'شاهد إعلان فيديو لمدة 30 ثانية واربح 15 نقطة',
          points: 15,
          type: 'ad_watch',
          isActive: true,
        },
        {
          id: '2',
          title: 'ادع صديق جديد',
          description: 'ادع صديقاً للتسجيل باستخدام كود الإحالة الخاص بك',
          points: 100,
          type: 'referral',
          isActive: true,
        },
        {
          id: '3',
          title: 'استطلاع رأي سريع',
          description: 'شارك في استطلاع رأي حول التطبيق واربح نقاط إضافية',
          points: 50,
          type: 'survey',
          isActive: true,
        },
      ];
      
      return mockTasks;
    } catch (error) {
      throw error;
    }
  }

  async completeTask(userId: string, taskId: string): Promise<{
    success: boolean;
    points: number;
    message: string;
  }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        success: true,
        points: 15,
        message: 'تهانينا! لقد أكملت المهمة وربحت النقاط.',
      };
    } catch (error) {
      return {
        success: false,
        points: 0,
        message: 'حدث خطأ أثناء إكمال المهمة.',
      };
    }
  }
}

export const taskService = new TaskService();