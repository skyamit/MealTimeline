import { Text, View } from "react-native";
import { StyleSheet } from 'react-native';

const NutritionRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};
export default NutritionRow;


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
  },

  label: {
    fontSize: 13,
    color: '#6B7280', // muted gray
    fontWeight: '500',
  },

  value: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '700',
  },
});
