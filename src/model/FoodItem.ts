import { DietType } from "./DietType";
import { MealType } from "./MealType";

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  serving: {
    quantity: number;
    unit: string;
    weight_g: number | null;
  };
  calories: number;
  macros: {
    carbs_g: number;
    protein_g: number;
    fat_g: number;
  };
  diet: DietType[];
  meal_type: MealType[];
}