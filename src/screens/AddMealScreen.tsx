import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import FoodSelector from '../components/foodPicker/FoodSelector';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles, { colors } from '../theme/style';
import { MealType, AllMealType } from '../model/MealType';
import { FOODS } from '../data/dataSet';
import NutritionRow from '../components/foodPicker/NutritionRow';
import { addOrUpdateMeal } from '../storage/TimelineStorage';
import { TimelineItem } from '../model/TimelineItem';

const AddMealSheet: React.FC = () => {
  const [mealType, setMealType] = useState<MealType>('lunch');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedFoodIds, setSelectedFoodIds] = useState<string[]>([]);
  const selectedFoods = useMemo(
    () => FOODS.filter(f => selectedFoodIds.includes(f.id)),
    [selectedFoodIds],
  );

  const resetMealState = () => {
    setMealType('lunch');
    setQuantities({});
    setSelectedFoodIds([]);
  };

  const total = useMemo(() => {
    return selectedFoods.reduce(
      (acc, food) => {
        const qty = quantities[food.id] ?? 1;

        acc.calories += food.calories * qty;
        acc.carbs += food.macros.carbs_g * qty;
        acc.protein += food.macros.protein_g * qty;
        acc.fat += food.macros.fat_g * qty;

        return acc;
      },
      {
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      },
    );
  }, [selectedFoods, quantities]);

  const addMeal = () => {
    if (selectedFoodIds.length === 0) {
      Alert.alert(
        'No food selected',
        'Please select at least one food before saving the meal.',
      );
      return;
    }

    const foodsWithQuantity = selectedFoods.map(food => ({
      ...food,
      qty: quantities[food.id] ?? 1,
    }));

    const item = {
      mealType: mealType,
      totalCalorie: total.calories,
      totalCarbohydrate: total.carbs,
      totalFats: total.fat,
      totalProtein: total.protein,
      foods: foodsWithQuantity,
    };
    addOrUpdateMeal(item);
    resetMealState();
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={['top']}
    >
      <View style={[styles.header]}>
        <Text style={[styles.username]}>Health is Wealth</Text>
        <Text style={[styles.greeting]}>Eat healthy foods</Text>
      </View>

      <View style={styles.container}>
        <FoodSelector
          pSetQuantities={setQuantities}
          pQuantities={quantities}
          pSelectedFoodIds={selectedFoodIds}
          pSetSelectedFoodIds={setSelectedFoodIds}
          pSelectedFoods={selectedFoods}
        />
        <View style={[{ height: 240, position: 'relative' }]}>
          <Text style={styles.label}>Meal Type</Text>
          <View style={styles.mealTypeRow}>
            {AllMealType.map(type => (
              <Pressable
                key={type}
                onPress={() => setMealType(type as MealType)}
                style={[
                  styles.mealChip,
                  mealType === type && styles.mealChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.mealChipText,
                    mealType === type && styles.mealChipTextActive,
                  ]}
                >
                  {type.toUpperCase()}
                </Text>
              </Pressable>
            ))}
          </View>
          <View style={[commonStyles.fullHorizontalLine, { padding: 10 }]} />
          <View style={styles.nutritionCard}>
            <NutritionRow
              label="Calories"
              value={`${total.calories.toFixed(1)} kcal`}
            />
            <NutritionRow label="Carbs" value={`${total.carbs.toFixed(1)} g`} />
            <NutritionRow
              label="Protein"
              value={`${total.protein.toFixed(1)} g`}
            />
            <NutritionRow label="Fats" value={`${total.fat.toFixed(1)} g`} />
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={resetMealState}
            style={[commonStyles.cancel, { width: '45%', height: 40 }]}
          >
            <Text style={[commonStyles.submitText]}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={addMeal}
            style={[commonStyles.submit, { width: '45%', height: 40 }]}
          >
            <Text style={[commonStyles.submitText]}>Add Meal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddMealSheet;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    paddingHorizontal: 10,
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    maxHeight: '90%',
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

  close: {
    fontSize: 18,
    color: '#666',
  },

  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  rowIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  rowText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },

  value: {
    fontSize: 14,
    color: '#555',
  },

  arrow: {
    fontSize: 16,
    color: '#999',
  },

  foodCard: {
    marginTop: 8,
  },

  foodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  foodTitle: {
    fontSize: 15,
    fontWeight: '600',
  },

  foodTotal: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },

  foodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E6ED',
  },

  foodName: {
    fontSize: 14,
    color: '#222',
  },

  foodRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  foodCalories: {
    marginRight: 10,
    color: '#666',
  },

  delete: {
    fontSize: 16,
  },

  footer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 10,
  },

  // nutrition card
  nutritionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  // meal type option
  label: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: '600',
  },
  mealTypeRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  mealChip: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 100,
    borderRadius: 20,
    backgroundColor: colors.border,
  },
  mealChipActive: {
    backgroundColor: colors.buttonColor,
  },
  mealChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444',
  },
  mealChipTextActive: {
    color: '#fff',
  },
});
