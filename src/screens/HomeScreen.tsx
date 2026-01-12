import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles, { colors } from '../theme/style';

const HomeScreen: React.FC = () => {
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
                      670
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
            <View style={commonStyles.card}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Breakfast</Text>
                <Pressable>
                  <Text style={styles.addButton}> + ADD</Text>
                </Pressable>
              </View>
              <View style={styles.createSection}>
                <View style={styles.createSectionHeader}>
                  <Image
                    source={require('../../assets/alarm/plus.png')}
                    style={[{ width: 20, height: 20 }]}
                  />
                  <Text style={{ fontWeight: 500 }}>Log Breakfast</Text>
                </View>
                <View style={[commonStyles.horizontalLine, { width: 100 }]} />
                <View>
                  <Text style={{ color: colors.textSecondary }}>
                    Add your morning meal
                  </Text>
                </View>
              </View>
            </View>
            <View style={commonStyles.card}>
              <View style={[styles.sectionHeader]}>
                <Text style={styles.sectionTitle}>Lunch</Text>
                <Pressable>
                  <Text style={styles.addButton}> + ADD</Text>
                </Pressable>
              </View>
              <View style={styles.createSection}>
                <View style={styles.createSectionHeader}>
                  <Image
                    source={require('../../assets/alarm/plus.png')}
                    style={[{ width: 20, height: 20 }]}
                  />
                  <Text style={{ fontWeight: 500 }}>Log Lunch</Text>
                </View>
                <View style={[commonStyles.horizontalLine, { width: 100 }]} />
                <View>
                  <Text style={{ color: colors.textSecondary }}>
                    Add your afternoon meal
                  </Text>
                </View>
              </View>
            </View>
            <View style={commonStyles.card}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Dinner</Text>
                <Pressable>
                  <Text style={styles.addButton}> + ADD</Text>
                </Pressable>
              </View>
              <View style={styles.createSection}>
                <View style={styles.createSectionHeader}>
                  <Image
                    source={require('../../assets/alarm/plus.png')}
                    style={[{ width: 20, height: 20 }]}
                  />
                  <Text style={{ fontWeight: 500 }}>Log Dinner</Text>
                </View>
                <View style={[commonStyles.horizontalLine, { width: 100 }]} />
                <View>
                  <Text style={{ color: colors.textSecondary }}>
                    Add your evening meal
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Streak Card */}
          <View style={styles.streakCard}>
            {/* <Ionicons name="flame" size={28} color="#F97316" /> */}
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
