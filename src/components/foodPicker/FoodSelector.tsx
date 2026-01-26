import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FOODS } from '../../data/dataSet';
import commonStyles, { colors } from '../../theme/style';
import { FoodItem } from '../../model/FoodItem';

type Props = {
  pQuantities: Record<string, number>;
  pSetQuantities: React.Dispatch<React.SetStateAction<Record<string, number>>>;

  pSelectedFoodIds: string[];
  pSetSelectedFoodIds: React.Dispatch<React.SetStateAction<string[]>>;

  pSelectedFoods: FoodItem[];
};
export default function FoodSelector({
  pQuantities,
  pSetQuantities,
  pSelectedFoodIds,
  pSetSelectedFoodIds,
  pSelectedFoods
}: Props) {
  const [open, setOpen] = useState(false);
  const items = useMemo(
    () =>
      FOODS.map(food => ({
        label: `${food.name} (${food.serving.unit})`,
        value: food.id,
      })),
    [],
  );

  const incrementQty = (id: string) => {
    pSetQuantities(prev => ({
      ...prev,
      [id]: (prev[id] ?? 1) + 1,
    }));
  };

  const decrementQty = (id: string) => {
    pSetQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] ?? 1) - 1),
    }));
  };

  return (
    <View style={{ display: 'flex', flex: 1, paddingTop: 10,}}>
      <View style={[commonStyles.card, { padding: 0 }]}>
        <DropDownPicker
          open={open}
          value={pSelectedFoodIds}
          items={items}
          setOpen={setOpen}
          setValue={pSetSelectedFoodIds}
          searchable
          placeholder="Choose food"
          zIndex={3000}
          zIndexInverse={1000}
          listMode="MODAL"
          multiple={true}
          mode="BADGE"
          closeOnBackPressed={true}
          style={{ borderWidth: 0, padding: 0 }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {pSelectedFoods.map(selectedFood => {
          const qty = pQuantities[selectedFood.id] ?? 1;
          return (
            <View
              key={selectedFood.id}
              style={[
                commonStyles.cardNoBackground,
                { marginTop: 10, borderColor: colors.textSecondary },
              ]}
            >
              <View style={[]}>
                <View style={styles.qntyTitle}>
                  <Text style={styles.title}>
                    {selectedFood.name} ({selectedFood.serving.unit})
                  </Text>
                  <View style={styles.qtyContainer}>
                    <Pressable
                      style={({ pressed }) => [
                        styles.qtyButton,
                        pressed && styles.pressed,
                      ]}
                      onPress={() => decrementQty(selectedFood.id)}
                    >
                      <Text style={styles.qtyButtonText}>−</Text>
                    </Pressable>

                    <Text style={styles.qtyValue}>{qty}</Text>

                    <Pressable
                      style={({ pressed }) => [
                        styles.qtyButton,
                        pressed && styles.pressed,
                      ]}
                      onPress={() => incrementQty(selectedFood.id)}
                    >
                      <Text style={styles.qtyButtonText}>+</Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.qntyTitle}>
                  <Text>
                    🔥{' '}
                    <Text style={styles.macroValue}>
                      {(selectedFood.calories * qty).toFixed(1)}
                    </Text>{' '}
                    kcal
                  </Text>
                  <Text style={[styles.macrosLine]}>
                    C{' '}
                    <Text style={[styles.macroValue, styles.carbs]}>
                      {(selectedFood.macros.carbs_g * qty).toFixed(1)}
                    </Text>{' '}
                    g<Text style={styles.bullet}> • </Text>P{' '}
                    <Text style={[styles.macroValue, styles.protein]}>
                      {(selectedFood.macros.protein_g * qty).toFixed(1)}
                    </Text>{' '}
                    g<Text style={styles.bullet}> • </Text>F{' '}
                    <Text style={[styles.macroValue, styles.fat]}>
                      {(selectedFood.macros.fat_g * qty).toFixed(1)}
                    </Text>{' '}
                    g
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    zIndex: 1,
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    // borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  meta: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  scrollContent: {
    paddingBottom: 10,
    backgroundColor: 'transparent',
    // borderWidth: 1,
    // padding: 20,
  },
  qntyTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  //quantity
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 10,
    backgroundColor: colors.accent,
    // paddingHorizontal: 6,
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:1,
    backgroundColor: colors.buttonColor,
  },
  qtyButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textButton,
  },
  qtyValue: {
    minWidth: 30,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.6,
  },
  macrosLine: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  macroValue: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  bullet: {
    fontSize: 15,
  },
  carbs: {
    color: colors.carbs,
  },
  protein: {
    color: colors.protein,
  },
  fat: {
    color: colors.fats,
  },
});
