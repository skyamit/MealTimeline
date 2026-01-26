import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles, { colors } from '../theme/style';
import { getTimelineFromStorage } from '../storage/TimelineStorage';
import { TimelineItem } from '../model/TimelineItem';
import { useFocusEffect } from '@react-navigation/native';
import { AllMealType } from '../model/MealType';
import MealDetails from './MealDetails';

const HomeScreen: React.FC = () => {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [total, setTotal] = useState({
    calories: 0,
    fats: 0,
    carbs: 0,
    protein: 0,
  });

  useEffect(() => {
    loadTimeline();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTimeline();
    }, []),
  );

  const loadTimeline = async () => {
    const data = await getTimelineFromStorage();
    setTimeline(data);
    await getAllSum();
  };

  const getAllSum = () => {
    const sum = timeline.reduce(
      (acc, data) => {
        acc.calories += data.totalCalorie;
        acc.carbs += data.totalCarbohydrate;
        acc.fats += data.totalFats;
        acc.protein += data.totalProtein;
        return acc;
      },
      { calories: 0, fats: 0, carbs: 0, protein: 0 },
    );
    setTotal(sum);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View style={styles.container}>
        <View style={[styles.header]}>
          <Text style={styles.username}>Hello! Amit</Text>
          <Text style={styles.greeting}>Track your meals, stay healthy</Text>
        </View>
        <ScrollView>
          <View style={[styles.overViewMessage]}>
            <View style={[commonStyles.card]}>
              <Text style={[styles.overViewMessageT, { fontWeight: 500 }]}>
                Welcome back! Here's your meal overview for today.
              </Text>
            </View>
          </View>
          <View style={[styles.overviewBody]}>
            <View style={[commonStyles.card, styles.breakfastCard]}>
              <Image
                source={require('../../assets/home/homeBreakfast.png')}
                style={styles.homeBreakfastImg}
              />
              <View
                style={[
                  styles.overviewRight,
                  { paddingTop: 5, paddingBottom: 5 },
                ]}
              >
                <View>
                  <Text style={[{ fontWeight: 600, fontSize: 15 }]}>
                    Breakfast & Lunch Logged!
                  </Text>
                </View>
                <View style={[styles.consumedDiv]}>
                  <View style={[styles.consumed, styles.consumedLeft]}>
                    <Text
                      style={[{ color: colors.buttonColor, fontWeight: 600 }]}
                    >
                      {total.calories}
                    </Text>
                    <Text
                      style={[{ color: colors.textSecondary, fontWeight: 500 }]}
                    >
                      Consumed
                    </Text>
                  </View>
                  <View style={[styles.consumed, styles.consumedRight]}>
                    <Text
                      style={[{ color: colors.buttonColor, fontWeight: 600 }]}
                    >
                      530
                    </Text>
                    <Text
                      style={[{ color: colors.textSecondary, fontWeight: 500 }]}
                    >
                      Remaining
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            {AllMealType.map((data, index) => {
              return (
                <MealDetails key={index} meal={data} timelineItems={timeline} />
              );
            })}
          </View>

          <View style={styles.streakCard}>
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.streakValue}>18 Day Streak 🔥</Text>
              <Text style={styles.streakLabel}>
                You’re eating on time consistently
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
  // overview message
  overViewMessage: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  overViewMessageT: {
    fontWeight: 400,
  },
  // overview
  overviewBody: {
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
  },
  breakfastCard: {
    flexDirection: 'row',
    padding: 0,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 0,
  },
  overviewRight: {
    flex: 1,
    padding: 1,
  },
  // consumed
  consumedDiv: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    // borderWidth: 1,
  },
  consumed: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  consumedLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightWidth: 0,
  },
  consumedRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  homeBreakfastImg: {
    width: 100,
    height: 100,
  },
  // section
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
    display: 'flex',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 12,
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  //create section
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
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    margin: 16,
    padding: 16,
    borderRadius: 20,
  },
  streakValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#9A3412',
  },
  streakLabel: {
    fontSize: 13,
    color: '#92400E',
    marginTop: 4,
  },
});
