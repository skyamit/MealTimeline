import { View, Text, Image, Pressable, StyleSheet, Alert } from 'react-native';
import commonStyles, { colors } from '../theme/style';
import { TimelineItem } from '../model/TimelineItem';
import CreateMeal from '../components/foodPicker/CreateMeal';
import MealData from '../components/foodPicker/MealData';
import { deleteMeal } from '../storage/TimelineStorage';
import { capitalizeFirst } from '../constants/Utils';

type Prop = {
  meal: string;
  timelineItems: TimelineItem[];
};
const MealDetails = ({ meal, timelineItems }: Prop) => {
  const mealTypeTimeline = timelineItems.filter(
    item => item.mealType === meal,
  );
const deleteAllMeal = async () => {
    await deleteMeal(meal);
}
  return (
    <View style={commonStyles.card}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{capitalizeFirst(meal)}</Text>
        <Pressable onPress={deleteAllMeal}>
          <Text style={styles.addButton}>Delete</Text>
        </Pressable>
      </View>
      {mealTypeTimeline.length == 0 && (
        <CreateMeal mealType={meal} />
      )}
      {
        mealTypeTimeline.length > 0 && (
            mealTypeTimeline.map((data, index) => {
                return (
                    <MealData key={index} meal={data} />
                );
            })
        )
      }
    </View>
  );
};
export default MealDetails;

const styles = StyleSheet.create({
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 12,
  },
  addButton: {
    borderWidth: 1,
    backgroundColor: colors.buttonColor,
    color: colors.textButton,
    borderColor: colors.border,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    padding: 5,
    fontWeight: 600,
  },
});
