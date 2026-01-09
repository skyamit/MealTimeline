import notifee, {
  TriggerType,
  AndroidCategory,
  AndroidImportance,
} from '@notifee/react-native';
import { Alarm } from '../model/Alarm';
import { Alert, Platform } from 'react-native';
import {
  loadAlarms,
  saveAlarms,
} from '../components/alarmStorage';

export async function addAlarm(alarm: Alarm) {
  const time = getNextAlarmDate(alarm);
  if (time == null) {
    Alert.alert('Time is null');
    return;
  }
  const now = new Date(Date.now());
  if (time <= now) {
    Alert.alert('Invalid time ⏰', 'Please select a future date and time!');
    return;
  }
  const alarms = await loadAlarms();
  alarms.push(alarm);

  alarms.sort((a, b) => {
    let aTime = getNextAlarmDate(a)?.getTime();
    let bTime = getNextAlarmDate(b)?.getTime();
    if (aTime == null) aTime = 0;
    if (bTime == null) bTime = 0;
    return aTime - bTime;
  });

  await saveAlarms(alarms);
  await scheduleAlarm(alarm);
  // cleanAlarm();
}

export async function scheduleAlarm(alarm: Alarm) {
  const time = getNextAlarmDate(alarm);
  if (time == null || !alarm.enabled) return;
  await notifee.cancelTriggerNotification(alarm.id);

  await notifee.createTriggerNotification(
    {
      id: alarm.id,
      title: 'Meal Time 🍽️',
      body: alarm.label ?? 'Time to eat!',
      android: {
        channelId: 'meal',
        category: AndroidCategory.ALARM,
        importance: AndroidImportance.HIGH,
        pressAction: { id: 'default' },
        fullScreenAction: { id: 'default' },
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: time?.getTime(),
      alarmManager: {
        allowWhileIdle: true,
      },
    },
  );
}


export async function cancelAlarmNotification(alarmId: string) {
  try {
    await notifee.cancelTriggerNotification(alarmId);
    console.log('Alarm cancelled:', alarmId);
  } catch (error) {
    console.error('Failed to cancel alarm:', error);
  }
}

const DAY_MAP: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export const getNextAlarmDate = (alarm: Alarm): Date | null => {
  const now = new Date();
  let hour24 = alarm.hour;
  // 🕒 Non-repeating alarm
  if (!alarm.repeat || alarm.repeat.length === 0) {
    const alarmDate = new Date(now);
    alarmDate.setHours(hour24, alarm.minute, 0, 0);

    if (alarmDate <= now) {
      alarmDate.setDate(alarmDate.getDate() + 1);
    }
    return alarmDate;
  }

  // 🔁 Repeating alarm
  for (let i = 0; i < 7; i++) {
    const candidate = new Date(now);
    candidate.setDate(now.getDate() + i);
    candidate.setHours(hour24, alarm.minute, 0, 0);

    const dayIndex = candidate.getDay(); // 0–6

    const matchesDay = alarm.repeat.some(day => DAY_MAP[day] === dayIndex);

    if (matchesDay && candidate > now) {
      return candidate;
    }
  }

  return null;
};

const to24Hour = (hour: number, ampm: string) => {
  if (ampm === 'PM' && hour !== 12) return hour + 12;
  if (ampm === 'AM' && hour === 12) return 0;
  return hour;
};
