// Powered by OnSpace.AI
import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { usePoints } from '../../contexts/PointsContext';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { user } = useAuth();
  const { points, dailyBonus, claimDailyBonus, refreshPoints } = usePoints();

  useEffect(() => {
    if (!user) {
      router.replace('/auth');
    }
  }, [user]);

  const handleClaimDailyBonus = async () => {
    const success = await claimDailyBonus();
    if (success) {
      Alert.alert('تهانينا!', 'لقد حصلت على مكافأة يومية قدرها 25 نقطة!');
    } else {
      Alert.alert('خطأ', 'حدث خطأ أثناء استلام المكافأة اليومية');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Points */}
        <LinearGradient
          colors={['#4CAF50', '#2E7D32']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            <Text style={styles.welcomeText}>مرحباً {user.name}</Text>
            <View style={styles.pointsContainer}>
              <MaterialIcons name="stars" size={24} color="#FFD700" />
              <Text style={styles.pointsText}>{points} نقطة</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Daily Bonus Card */}
        {dailyBonus && (
          <View style={styles.dailyBonusCard}>
            <LinearGradient
              colors={['#FF9800', '#F57C00']}
              style={styles.bonusGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.bonusContent}>
                <MaterialIcons name="card-giftcard" size={40} color="white" />
                <View style={styles.bonusTextContainer}>
                  <Text style={styles.bonusTitle}>مكافأة يومية متاحة!</Text>
                  <Text style={styles.bonusSubtitle}>احصل على 25 نقطة مجاناً</Text>
                </View>
                <TouchableOpacity
                  style={styles.claimButton}
                  onPress={handleClaimDailyBonus}
                >
                  <Text style={styles.claimButtonText}>استلم</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الإجراءات السريعة</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push('/tasks')}
            >
              <LinearGradient
                colors={['#2196F3', '#1976D2']}
                style={styles.actionGradient}
              >
                <Ionicons name="play-circle" size={32} color="white" />
                <Text style={styles.actionTitle}>شاهد إعلان</Text>
                <Text style={styles.actionSubtitle}>اربح 15 نقطة</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push('/redeem')}
            >
              <LinearGradient
                colors={['#9C27B0', '#7B1FA2']}
                style={styles.actionGradient}
              >
                <MaterialIcons name="redeem" size={32} color="white" />
                <Text style={styles.actionTitle}>استبدل النقاط</Text>
                <Text style={styles.actionSubtitle}>رصيد + باقات</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>إحصائياتك</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <MaterialIcons name="star" size={24} color="#FFD700" />
              <Text style={styles.statValue}>{points}</Text>
              <Text style={styles.statLabel}>إجمالي النقاط</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="today" size={24} color="#4CAF50" />
              <Text style={styles.statValue}>7</Text>
              <Text style={styles.statLabel}>أيام متتالية</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="group" size={24} color="#2196F3" />
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>أصدقاء مدعوون</Text>
            </View>
          </View>
        </View>

        {/* Referral Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ادع أصدقاءك</Text>
          <View style={styles.referralCard}>
            <View style={styles.referralContent}>
              <Ionicons name="people" size={40} color="#4CAF50" />
              <View style={styles.referralTextContainer}>
                <Text style={styles.referralTitle}>كود الإحالة الخاص بك</Text>
                <Text style={styles.referralCode}>{user.referralCode}</Text>
                <Text style={styles.referralSubtitle}>اربح 100 نقطة لكل صديق يسجل</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.shareButton}>
              <MaterialIcons name="share" size={20} color="white" />
              <Text style={styles.shareButtonText}>شارك</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>النشاط الأخير</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <MaterialIcons name="add-circle" size={24} color="#4CAF50" />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>مكافأة يومية</Text>
                <Text style={styles.activityTime}>منذ ساعتين</Text>
              </View>
              <Text style={styles.activityPoints}>+25</Text>
            </View>
            <View style={styles.activityItem}>
              <MaterialIcons name="play-circle-filled" size={24} color="#2196F3" />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>مشاهدة إعلان</Text>
                <Text style={styles.activityTime}>منذ 4 ساعات</Text>
              </View>
              <Text style={styles.activityPoints}>+15</Text>
            </View>
            <View style={styles.activityItem}>
              <MaterialIcons name="remove-circle" size={24} color="#FF5722" />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>استبدال رصيد</Text>
                <Text style={styles.activityTime}>أمس</Text>
              </View>
              <Text style={styles.activityPointsNegative}>-200</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerContent: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  dailyBonusCard: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bonusGradient: {
    padding: 16,
  },
  bonusContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bonusTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  bonusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bonusSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  claimButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  claimButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  section: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'right',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 48) / 2,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  actionGradient: {
    padding: 20,
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: (width - 64) / 3,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  referralCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  referralContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  referralTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  referralTitle: {
    fontSize: 14,
    color: '#666',
  },
  referralCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginVertical: 4,
  },
  referralSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  shareButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  shareButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  activityList: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityContent: {
    flex: 1,
    marginLeft: 12,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  activityPoints: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  activityPointsNegative: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF5722',
  },
});