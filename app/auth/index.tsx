// Powered by OnSpace.AI
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const ALGERIAN_WILAYAS = [
  'الجزائر', 'البليدة', 'وهران', 'سطيف', 'قسنطينة', 'عنابة', 'باتنة', 'تلمسان',
  'بجاية', 'تيزي وزو', 'ورقلة', 'سكيكدة', 'جيجل', 'مستغانم', 'تبسة', 'بشار',
  'المدية', 'البويرة', 'تيارت', 'الأغواط', 'سيدي بلعباس', 'غرداية', 'الطارف',
  'تندوف', 'أدرار', 'إليزي', 'تمنراست', 'الوادي', 'خنشلة', 'سوق أهراس',
  'تيسمسيلت', 'ميلة', 'عين الدفلى', 'النعامة', 'عين تموشنت', 'غليزان',
  'برج بوعريريج', 'المسيلة', 'معسكر', 'الشلف', 'بومرداس', 'الجلفة',
  'عين البواقي', 'أم البواقي', 'بسكرة', 'قالمة', 'خميس مليانة', 'تيبازة'
];

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWilayaDropdown, setShowWilayaDropdown] = useState(false);

  const { login, register } = useAuth();

  const handleAuth = async () => {
    if (!phone || !password) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (!isLogin) {
      if (!name || !wilaya) {
        Alert.alert('خطأ', 'يرجى ملء جميع الحقول المطلوبة');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('خطأ', 'كلمتا المرور غير متطابقتين');
        return;
      }
      if (phone.length < 10) {
        Alert.alert('خطأ', 'رقم الهاتف غير صحيح');
        return;
      }
    }

    setLoading(true);
    
    try {
      let success = false;
      
      if (isLogin) {
        success = await login(phone, password);
      } else {
        success = await register({
          phone,
          password,
          name,
          wilaya,
          referralCode,
        });
      }

      if (success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('خطأ', isLogin ? 'فشل تسجيل الدخول' : 'فشل إنشاء الحساب');
      }
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  const selectWilaya = (selectedWilaya: string) => {
    setWilaya(selectedWilaya);
    setShowWilayaDropdown(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <LinearGradient
            colors={['#4CAF50', '#2E7D32']}
            style={styles.header}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <MaterialIcons name="stars" size={60} color="#FFD700" />
            <Text style={styles.appTitle}>DZ Points</Text>
            <Text style={styles.appSubtitle}>اربح النقاط واستبدلها بجوائز حقيقية</Text>
          </LinearGradient>

          {/* Auth Form */}
          <View style={styles.formContainer}>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, isLogin && styles.activeTab]}
                onPress={() => setIsLogin(true)}
              >
                <Text style={[styles.tabText, isLogin && styles.activeTabText]}>
                  تسجيل الدخول
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, !isLogin && styles.activeTab]}
                onPress={() => setIsLogin(false)}
              >
                <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>
                  إنشاء حساب
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              {!isLogin && (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>الاسم الكامل</Text>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="أدخل اسمك الكامل"
                    placeholderTextColor="#999"
                  />
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>رقم الهاتف</Text>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="0555123456"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                />
              </View>

              {!isLogin && (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>الولاية</Text>
                  <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => setShowWilayaDropdown(!showWilayaDropdown)}
                  >
                    <Text style={[styles.dropdownText, !wilaya && styles.placeholder]}>
                      {wilaya || 'اختر ولايتك'}
                    </Text>
                    <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
                  </TouchableOpacity>
                  
                  {showWilayaDropdown && (
                    <ScrollView style={styles.dropdownList} nestedScrollEnabled>
                      {ALGERIAN_WILAYAS.map((w, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.dropdownItem}
                          onPress={() => selectWilaya(w)}
                        >
                          <Text style={styles.dropdownItemText}>{w}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>كلمة المرور</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="أدخل كلمة المرور"
                  placeholderTextColor="#999"
                  secureTextEntry
                />
              </View>

              {!isLogin && (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>تأكيد كلمة المرور</Text>
                  <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="أعد كتابة كلمة المرور"
                    placeholderTextColor="#999"
                    secureTextEntry
                  />
                </View>
              )}

              {!isLogin && (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>كود الإحالة (اختياري)</Text>
                  <TextInput
                    style={styles.input}
                    value={referralCode}
                    onChangeText={setReferralCode}
                    placeholder="أدخل كود الإحالة إن وجد"
                    placeholderTextColor="#999"
                    autoCapitalize="characters"
                  />
                </View>
              )}
            </View>

            <TouchableOpacity
              style={[styles.authButton, loading && styles.authButtonDisabled]}
              onPress={handleAuth}
              disabled={loading}
            >
              <LinearGradient
                colors={loading ? ['#ccc', '#999'] : ['#4CAF50', '#2E7D32']}
                style={styles.authButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.authButtonText}>
                  {loading ? 'جاري المعالجة...' : isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {!isLogin && (
              <View style={styles.bonusInfo}>
                <MaterialIcons name="card-giftcard" size={24} color="#4CAF50" />
                <Text style={styles.bonusText}>
                  احصل على 50 نقطة مجانية عند التسجيل!
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
  },
  appSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 8,
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    textAlign: 'right',
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    textAlign: 'right',
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    color: '#999',
  },
  dropdownList: {
    backgroundColor: 'white',
    borderRadius: 12,
    maxHeight: 200,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
  },
  authButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  authButtonDisabled: {
    opacity: 0.7,
  },
  authButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  authButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bonusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 16,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.2)',
  },
  bonusText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '500',
  },
});