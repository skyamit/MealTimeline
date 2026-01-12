import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import { colors } from '../theme/style';
import { Image } from 'react-native';
import AlarmList from '../screens/AlarmScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TimelineScreen from '../screens/TimelineScreen';
import StatsScreen from '../screens/StatsScreen';

const Tab = createBottomTabNavigator();

export const bottomNavIcons = {
  timeline: {
    active: require('../../assets/bottomNav/timelineActive.png'),
    inactive: require('../../assets/bottomNav/timelineInActive.png'),
  },
  home: {
    active: require('../../assets/bottomNav/homeActive.png'),
    inactive: require('../../assets/bottomNav/homeInActive.png'),
  },
  alarm: {
    active: require('../../assets/bottomNav/alarmActive.png'),
    inactive: require('../../assets/bottomNav/alarmInActive.png'),
  },
  profile: {
    active: require('../../assets/bottomNav/userActive.png'),
    inactive: require('../../assets/bottomNav/userInActive.png'),
  },
  add: {
    active: require('../../assets/alarm/plus.png'),
  },
};

const BottomTabs = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.inactive,
        safeAreaInsets: { bottom: 'always' },
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 12,
          marginBottom: 3,
        },
        tabBarStyle: {
          paddingBottom: insets.bottom,
          height: 50 + insets.bottom,
          paddingTop: 5,
        },
        tabBarIcon: ({ focused }) => {
          let icon;

          if (route.name == 'Profile') {
            icon = focused
              ? bottomNavIcons.profile.active
              : bottomNavIcons.profile.inactive;
          }
          if (route.name == 'Timeline') {
            icon = focused
              ? bottomNavIcons.timeline.active
              : bottomNavIcons.timeline.inactive;
          }
          if (route.name == 'Home') {
            icon = focused
              ? bottomNavIcons.home.active
              : bottomNavIcons.home.inactive;
          }
          if (route.name == 'Alarm') {
            icon = focused
              ? bottomNavIcons.alarm.active
              : bottomNavIcons.alarm.inactive;
          }
          if (route.name == 'Add Meal') {
            icon = bottomNavIcons.add.active;

            return (
              <Image
                source={icon}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
            );
          }
          return (
            <Image
              source={icon}
              style={{ width: 18, height: 18 }}
              resizeMode="contain"
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Timeline" component={TimelineScreen} />
      <Tab.Screen name="Add Meal" component={TimelineScreen} />
      <Tab.Screen name="Alarm" component={AlarmList} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
