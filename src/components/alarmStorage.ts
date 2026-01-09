import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alarm } from '../model/Alarm';
import { cancelAlarmNotification, scheduleAlarm } from './AlarmQueue';

const KEY = 'MEAL_ALARMS';

export async function saveAlarms(alarms: Alarm[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(alarms));
}

export async function loadAlarms(): Promise<Alarm[]> {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export async function cleanAlarm() {
  await AsyncStorage.setItem(
    KEY,
    '[]'
  );
}

export async function removeAlarmFromStorage(
  alarmId: string
): Promise<Alarm[]> {
  const stored = await AsyncStorage.getItem(KEY);

  if (!stored) return [];

  const alarms: Alarm[] = JSON.parse(stored);

  const updatedAlarms = alarms.filter(a => a.id !== alarmId);

  await AsyncStorage.setItem(
    KEY,
    JSON.stringify(updatedAlarms)
  );

  return updatedAlarms;
}

export async function updateAlarmEnabled(
  alarmId: string,
  enabled: boolean
) {
  const stored = await AsyncStorage.getItem(KEY);
  if (!stored) return;

  const alarms: Alarm[] = JSON.parse(stored);

  const updatedAlarms = alarms.map(alarm => {
    if (alarm.id === alarmId) {
      return { ...alarm, enabled };
    }
    return alarm;
  });

  await AsyncStorage.setItem(
    KEY,
    JSON.stringify(updatedAlarms)
  );

  const alarm = updatedAlarms.find(a => a.id === alarmId);
  if (!alarm) return;

  if (enabled) {
    await scheduleAlarm(alarm);
  } else {
    await cancelAlarmNotification(alarmId)
  }
}

export async function getAlarmById(alarmId:string) {
  const stored = await AsyncStorage.getItem(KEY);
  if (!stored) return null;

  const alarms: Alarm[] = JSON.parse(stored);
  const alarm = alarms.find(a => a.id === alarmId);
  if (!alarm) return null;
  return alarm;
}