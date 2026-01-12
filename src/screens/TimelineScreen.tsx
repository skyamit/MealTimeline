// import { Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import commonStyles from "../theme/style";

// const TimelineScreen: React.FC = () => {
//   return (
//     <SafeAreaView style={[commonStyles.screenBackground, {flex : 1}]} edges={['top']}>
//         <View style={[]}>
//         </View> 
//     </SafeAreaView>
//   );
// }

// export default TimelineScreen;

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

const TimelineScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meal Timeline</Text>
        <Text style={styles.headerSubtitle}>Your daily food routine</Text>
      </View>

      {/* Timeline */}
      <ScrollView contentContainerStyle={styles.timelineContainer}>
        <TimelineCard time="06:30 AM" title="Wake Up" icon="sunny" status="done" />
        <TimelineCard time="08:30 AM" title="Breakfast" icon="restaurant" status="upcoming" />
        <TimelineCard time="11:30 AM" title="Fruits / Snack" icon="nutrition" status="pending" />
        <TimelineCard time="01:30 PM" title="Lunch" icon="fast-food" status="pending" />
        <TimelineCard time="05:30 PM" title="Evening Snack" icon="cafe" status="pending" />
        <TimelineCard time="08:30 PM" title="Dinner" icon="restaurant" status="pending" />
        <TimelineCard time="10:30 PM" title="Sleep" icon="moon" status="pending" />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        {/* <Ionicons name="add" size={28} color="#fff" /> */}
      </TouchableOpacity>
    </View>
  );
};

const TimelineCard = ({
  time,
  title,
  icon,
  status,
}: {
  time: string;
  title: string;
  icon: any;
  status: 'done' | 'upcoming' | 'pending';
}) => {
  const getStatusColor = () => {
    if (status === 'done') return '#16A34A';
    if (status === 'upcoming') return '#4F46E5';
    return '#9CA3AF';
  };

  return (
    <View style={styles.timelineCard}>
      <View style={styles.timeColumn}>
        <Text style={styles.timeText}>{time}</Text>
        <View style={[styles.verticalLine, { backgroundColor: getStatusColor() }]} />
      </View>

      <View style={styles.contentCard}>
        <View style={[styles.iconWrapper, { backgroundColor: getStatusColor() + '20' }]}>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.mealTitle}>{title}</Text>
          <Text style={styles.mealStatus}>{status.toUpperCase()}</Text>
        </View>
      </View>
    </View>
  );
};

export default TimelineScreen;

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
  timelineContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  timelineCard: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timeColumn: {
    width: 70,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  verticalLine: {
    width: 2,
    flex: 1,
    borderRadius: 1,
  },
  contentCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  mealTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  mealStatus: {
    fontSize: 11,
    marginTop: 2,
    color: '#6B7280',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
});
