import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

const StatsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Statistics</Text>
        <Text style={styles.headerSubtitle}>Your food & routine insights</Text>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryRow}>
        <SummaryCard icon="alarm" value="128" label="Total Alarms" color="#4F46E5" />
        <SummaryCard icon="restaurant" value="312" label="Meals Logged" color="#16A34A" />
      </View>

      <View style={styles.summaryRow}>
        <SummaryCard icon="flame" value="18" label="Current Streak" color="#F97316" />
        <SummaryCard icon="calendar" value="92%" label="On-time Days" color="#0EA5E9" />
      </View>

      {/* Weekly Performance */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Meal Completion</Text>

        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
          <WeekBar key={day} day={day} percent={[80, 100, 60, 90, 75, 85, 95][index]} />
        ))}
      </View>

      {/* Meal-wise Stats */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Meal-wise Consistency</Text>

        <MealStat icon="sunny" label="Breakfast" percent={90} />
        <MealStat icon="fast-food" label="Lunch" percent={85} />
        <MealStat icon="cafe" label="Snacks" percent={70} />
        <MealStat icon="restaurant" label="Dinner" percent={88} />
      </View>

      {/* Missed Meals */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Missed Meals (Last 7 Days)</Text>
        <MissedItem label="Snacks" count={3} />
        <MissedItem label="Lunch" count={1} />
      </View>
    </ScrollView>
  );
};

const SummaryCard = ({ icon, value, label, color }: any) => (
  <View style={styles.summaryCard}>
    {/* <Ionicons name={icon} size={26} color={color} /> */}
    <Text style={styles.summaryValue}>{value}</Text>
    <Text style={styles.summaryLabel}>{label}</Text>
  </View>
);

const WeekBar = ({ day, percent }: { day: string; percent: number }) => (
  <View style={styles.weekRow}>
    <Text style={styles.weekLabel}>{day}</Text>
    <View style={styles.progressBg}>
      <View style={[styles.progressFill, { width: `${percent}%` }]} />
    </View>
    <Text style={styles.weekPercent}>{percent}%</Text>
  </View>
);

const MealStat = ({ icon, label, percent }: any) => (
  <View style={styles.mealRow}>
    {/* <Ionicons name={icon} size={22} color="#4F46E5" /> */}
    <Text style={styles.mealLabel}>{label}</Text>
    <View style={styles.progressBg}>
      <View style={[styles.progressFill, { width: `${percent}%` }]} />
    </View>
    <Text style={styles.weekPercent}>{percent}%</Text>
  </View>
);

const MissedItem = ({ label, count }: any) => (
  <View style={styles.missedRow}>
    <Text style={styles.missedLabel}>{label}</Text>
    <Text style={styles.missedCount}>{count} times</Text>
  </View>
);

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  header: {
    backgroundColor: '#4F46E5',
    padding: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#E0E7FF',
    fontSize: 13,
    marginTop: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  summaryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
    color: '#111827',
  },
  summaryLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  weekLabel: {
    width: 40,
    fontSize: 12,
    color: '#374151',
  },
  progressBg: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  progressFill: {
    height: 8,
    backgroundColor: '#4F46E5',
    borderRadius: 4,
  },
  weekPercent: {
    width: 40,
    fontSize: 12,
    textAlign: 'right',
    color: '#374151',
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealLabel: {
    width: 80,
    marginLeft: 8,
    fontSize: 13,
    color: '#111827',
  },
  missedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  missedLabel: {
    fontSize: 14,
    color: '#111827',
  },
  missedCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
  },
});