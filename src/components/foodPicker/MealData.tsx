import { TimelineItem } from '../../model/TimelineItem';

import { View, Text, StyleSheet } from 'react-native';
import commonStyles, { colors } from '../../theme/style';

type Prop = {
  meal: TimelineItem;
};

const MealData = ({ meal }: Prop) => {
  return (
    <View style={[styles.card, { marginTop: 5 }]}>
      {meal.foods.map(food => (
        <View key={food.id} style={styles.foodRow}>
          <Text style={styles.foodName}>{food.name}{' '} x {' '}{food.serving.quantity}</Text>
          <Text style={styles.foodMeta}>{food.calories} kcal</Text>
        </View>
      ))}
    </View>
  );
};

export default MealData;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: colors.border,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 10,
  },

  empty: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },

  foodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  foodName: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },

  foodMeta: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
  },
});
