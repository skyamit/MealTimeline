import { View, Image, Text, StyleSheet } from "react-native";
import commonStyles, { colors } from "../../theme/style";
import { capitalizeFirst } from "../../constants/Utils";

type Prop = {
    mealType : string;
}
const CreateMeal = ({mealType}: Prop) => {
    return (
        <View style={styles.createSection}>
          <View style={styles.createSectionHeader}>
            <Image
              source={require('../../../assets/alarm/plus.png')}
              style={[{ width: 20, height: 20 }]}
            />
            <Text style={{ fontWeight: 500 }}>Log {capitalizeFirst(mealType)}</Text>
          </View>
          <View style={[commonStyles.horizontalLine, { width: 100 }]} />
          <View>
            <Text style={{ color: colors.textSecondary }}>
              Add your meal
            </Text>
          </View>
        </View>
    );
}
export default CreateMeal;

const styles = StyleSheet.create({
  createSection: {
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.border,
    display: 'flex',
    alignItems: 'center',
    padding: 5,
    backgroundColor: colors.accent,
  },
  createSectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
});