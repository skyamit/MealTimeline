import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { Alarm } from '../../model/Alarm';
import AlarmToggle from './AlarmToggle';
import commonStyles from '../../theme/style';
import { cancelAlarmNotification, getNextAlarmDate } from '../AlarmQueue';
import { removeAlarmFromStorage } from '../alarmStorage';
import EntityConstants from '../constants/EntityConstants';
import AlarmDayView from './AlarmDayView';

type Prop = {
  alarmProp: Alarm;
  updateAlarmEnabled: (id: string, enabled: boolean) => void;
  loadAllAlarmsProp: () => void;
};
const formatAlarmTime = (timestamp: number) => {
  const date = new Date(timestamp);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

const AlarmTime = ({
  alarmProp,
  updateAlarmEnabled,
  loadAllAlarmsProp,
}: Prop) => {
  const [showDelete, setShowDelete] = useState(false);
  const nextAlarmTime = getNextAlarmDate(alarmProp);
  const time = nextAlarmTime?.getTime();
  if (time == null) return;
  const date = new Date(time);
  const hours24 = date.getHours();
  const hours12 = formatAlarmTime(time);
  const ampm = hours24 >= 12 ? 'PM' : 'AM';

  useEffect(() => {
    if (!showDelete) return;

    const timer = setTimeout(() => {
      setShowDelete(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showDelete]);

  const deleteAlarm = async (alarmId: string) => {
    const alarmss = await removeAlarmFromStorage(alarmId);
    await cancelAlarmNotification(alarmId);
    loadAllAlarmsProp();
  };

  const handleDeletePress = (alarmId: string) => {
    Alert.alert(
      'Delete Alarm',
      'Are you sure you want to delete this alarm?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setShowDelete(false),
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteAlarm(alarmId),
        },
      ],
      { cancelable: true },
    );
  };

  const updateAlarm = async (alarmId: string, isEnable: boolean) => {
    updateAlarmEnabled(alarmId, isEnable);
  };
  return (
    <View style={[commonStyles.card, styles.alarmTime]}>
      <View style={styles.alarmHeader}>
        <View style={styles.alarmDetails}>
          {showDelete ? (
            <Pressable onPress={() => handleDeletePress(alarmProp.id)}>
              <Image
                source={require('../../../assets/delete.png')}
                style={styles.alarmClock}
                resizeMode="contain"
              />
            </Pressable>
          ) : (
            <Pressable onPress={() => setShowDelete(prev => !prev)}>
              <Image
                source={require('../../../assets/alarm/alarmClock.png')}
                style={styles.alarmClock}
                resizeMode="contain"
              />
            </Pressable>
          )}
          <View style={{ width: '80%' }}>
            <View style={styles.headerContent}>
              <View style={styles.alarmTextContent}>
                <Text style={styles.alarmText}>
                  {alarmProp.alarmType == 'meal'
                    ? EntityConstants.MEAL_REMINDER
                    : EntityConstants.MEDICATION_REMINDER}
                </Text>
                <View style={styles.timeRow}>
                  <Text style={styles.time}>{hours12}</Text>
                  <Text style={styles.ampm}>{ampm}</Text>
                </View>
              </View>
              <View>
                <AlarmToggle
                  value={alarmProp.enabled}
                  onChange={() => updateAlarm(alarmProp.id, !alarmProp.enabled)}
                />
              </View>
            </View>
            <View style={commonStyles.fullHorizontalLine} />
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Text style={styles.alarmLabel}>
                {alarmProp.label ? alarmProp.label : alarmProp.alarmType}
              </Text>
            </View>
            <AlarmDayView daysProp={alarmProp.repeat} />
            {/* <View style={commonStyles.fullHorizontalLine} /> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default AlarmTime;

const styles = StyleSheet.create({
  alarmTime: {
    borderColor: '#dbdbdbff',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#f7f7f7ff',
    borderRadius: 15,
  },
  alarmHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  alarmClock: {
    width: 60,
    height: 60,
  },
  alarmDetails: {
    display: 'flex',
    flexDirection: 'row',
  },
  alarmTextContent: {
    paddingLeft: 10,
  },

  alarmText: {
    fontSize: 16,
    color: '#515151ff',
    fontWeight: 500,
  },
  alarmLabel: { fontSize: 14, fontWeight: 500, color: '#818181ff' },
  timeRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1,
    color: '#515151ff',
  },
  ampm: {
    fontSize: 16,
    color: '#515151ff',
    fontWeight: '500',
    marginLeft: 4,
  },
});
