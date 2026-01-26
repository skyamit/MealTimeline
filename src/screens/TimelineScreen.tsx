import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import commonStyles, { colors } from '../theme/style';
import { SafeAreaView } from 'react-native-safe-area-context';

type MealType = 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner';

interface MealItem {
  id: string;
  type: MealType;
  time: string;
  title: string;
  calories: number;
  image?: string;
}

const MEALS: MealItem[] = [
  {
    id: '1',
    type: 'Breakfast',
    time: '8:00 AM',
    title: 'Oatmeal with Berries',
    calories: 250,
    image: 'https://via.placeholder.com/60',
  },
  {
    id: '2',
    type: 'Lunch',
    time: '12:30 PM',
    title: 'Grilled Chicken Salad',
    calories: 420,
    image: 'https://via.placeholder.com/60',
  },
  {
    id: '3',
    type: 'Snack',
    time: '4:00 PM',
    title: 'Apple & Almonds',
    calories: 150,
    image: 'https://via.placeholder.com/60',
  },
];

const MealTimelineScreen: React.FC = () => {
  const renderItem = ({ item }: { item: MealItem }) => {
    return (
      <View style={styles.timelineRow}>
        <View style={styles.timeColumn}>
          <Text style={styles.timeText}>{item.time}</Text>
          <View style={styles.dot} />
          <View style={styles.verticalLine} />
        </View>

        <View style={[commonStyles.card, styles.card]}>
          <View style={styles.cardContent}>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.image} />
            )}

            <View style={styles.textContainer}>
              <Text style={styles.mealType}>{item.type}</Text>
              <Text style={styles.mealTitle}>{item.title}</Text>
              <Text style={styles.calories}>{item.calories} kcal</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View style={styles.container}>
        <View style={[styles.header]}>
          <Text style={[styles.username]}>Meal Timeline</Text>
          <Text style={[styles.greeting]}>Today</Text>
        </View>
        <ScrollView>
          <View style={styles.meals}>
            <FlatList
              data={MEALS}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabText}>＋</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MealTimelineScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 10,
    paddingLeft: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    backgroundColor: colors.card,
    borderBottomColor: colors.border,
  },
  greeting: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: 500,
  },
  username: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 4,
  },

  meals: {
    marginTop: 10,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 100,
  },

  timelineRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  timeColumn: {
    width: 70,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4A90E2',
    marginBottom: 4,
  },
  verticalLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#E0E6ED',
  },

  card: {
    flex: 1,
    marginLeft: 8,
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#EEE',
  },

  textContainer: {
    flex: 1,
  },

  mealType: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '600',
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginTop: 2,
  },
  calories: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    marginTop: -2,
  },
});
