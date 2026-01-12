import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles from '../theme/style';
import { colors } from '../theme/style';

const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView
      style={[commonStyles.screenBackground, { flex: 1 }]}
      edges={['top']}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/300' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Amit Kumar</Text>
          <Text style={styles.email}>amit@email.com</Text>

          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={[commonStyles.card, styles.statsCard]}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Alarms</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>245</Text>
            <Text style={styles.statLabel}>Meals Logged</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>18</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          <MenuItem icon="alarm" label="My Alarms" />
          <MenuItem icon="fast-food" label="Meal Preferences" />
          <MenuItem icon="notifications" label="Notification Settings" />
          <MenuItem icon="shield-checkmark" label="Privacy & Security" />
          <MenuItem icon="help-circle" label="Help & Support" />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn}>
          {/* <Ionicons name="log-out-outline" size={20} color="#FF4D4F" /> */}
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({ icon, label }: { icon: any; label: string }) => (
  <TouchableOpacity style={styles.menuItem}>
    {/* <Ionicons name={icon} size={22} color="#555" /> */}
    <Text style={styles.menuLabel}>{label}</Text>
    {/* <Ionicons name="chevron-forward" size={20} color="#999" /> */}
  </TouchableOpacity>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#E0E7FF',
    marginTop: 2,
  },
  editBtn: {
    marginTop: 12,
    backgroundColor: colors.buttonColor,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  statsCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: -24,
    borderRadius: 20,
    paddingVertical: 16,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  menuCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 20,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 32,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
  },
  logoutText: {
    marginLeft: 8,
    color: '#FF4D4F',
    fontWeight: '600',
  },
});
