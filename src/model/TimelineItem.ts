import { FoodItem } from "./FoodItem";

export interface TimelineItem {
  mealType: string;
  totalCalorie: number;
  totalCarbohydrate: number;
  totalFats: number;
  totalProtein: number;
  foods: FoodItem[];
}

export interface TimelineStorage {
  timeline: TimelineItem[];
}
