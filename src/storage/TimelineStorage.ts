import { Alert } from 'react-native';
import { TimelineItem, TimelineStorage } from '../model/TimelineItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMELINE_KEY = 'timeline';

export const getTimelineFromStorage = async () => {
  try {
    const data = await AsyncStorage.getItem(TIMELINE_KEY);
    if (!data) return [];
    const parsed: TimelineStorage = JSON.parse(data);
    return parsed.timeline || [];
  } catch (error) {
    return [];
  }
};

const saveTimelineToStorage = async (timeline: TimelineItem[]) => {
  const payload: TimelineStorage = { timeline };
  AsyncStorage.setItem(TIMELINE_KEY, JSON.stringify(payload));
  Alert.alert('Meal added!');
};

export const addOrUpdateMeal = async (meal: TimelineItem) => {
  const timeline = await getTimelineFromStorage();
  const index = timeline.findIndex(item => item.mealType === meal.mealType);
  if (index >= 0) {
    timeline[index] = meal;
  } else {
    timeline.push(meal);
  }
  saveTimelineToStorage(timeline);
};

export const editMeal = async (
  mealType: string,
  updatedMeal: Partial<TimelineItem>,
) => {
  const timeline = await getTimelineFromStorage();

  const updatedTimeline = timeline.map(item =>
    item.mealType === mealType ? { ...item, ...updatedMeal } : item,
  );

  await saveTimelineToStorage(updatedTimeline);
};

export const deleteMeal = async (mealType: string) => {
  const timeline = await getTimelineFromStorage();

  const updatedTimeline = timeline.filter(item => item.mealType !== mealType);

  saveTimelineToStorage(updatedTimeline);
};

export const deleteFoodFromMeal = async (mealType: string, foodId: string) => {
  const timeline = await getTimelineFromStorage();

  const updatedTimeline = timeline.map(meal => {
    if (meal.mealType !== mealType) return meal;

    const updatedFoods = meal.foods.filter(food => food.id !== foodId);

    const totals = updatedFoods.reduce(
      (acc, food) => {
        acc.calorie += food.calories;
        acc.carbs += food.macros.carbs_g;
        acc.protein += food.macros.protein_g;
        acc.fats += food.macros.fat_g;
        return acc;
      },
      { calorie: 0, carbs: 0, fats: 0, protein: 0 },
    );

    return {
      ...meal,
      foods: updatedFoods,
      totalCalorie: totals.calorie,
      totalCarbohydrate: totals.carbs,
      totalProtein: totals.protein,
      totalFats: totals.fats,
    };
  });

  await saveTimelineToStorage(updatedTimeline);
};

export const clearTimeline = async () => {
  await AsyncStorage.removeItem(TIMELINE_KEY);
};
