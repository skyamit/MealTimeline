/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee, {
  EventType,
} from '@notifee/react-native';
import { getAlarmById, updateAlarmEnabled } from './src/components/alarmStorage';
import { scheduleAlarm } from './src/components/AlarmQueue';

import { enableScreens } from 'react-native-screens';

enableScreens(true);


notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.DELIVERED) {
    const alarmId = detail.notification?.id;
    if (!alarmId) return;
    const alarm = await getAlarmById(alarmId);
    if (!alarm || !alarm.enabled) return;
    if (alarm.repeat == 0) {
      updateAlarmEnabled(alarmId, false);
      return;
    }
    await scheduleAlarm(alarm);
  }
});

notifee.onForegroundEvent(async ({ type, detail }) => {
  if (type === EventType.DELIVERED) {
    const alarmId = detail.notification?.id;
    if (!alarmId) return;

    const alarm = await getAlarmById(alarmId);
    if (!alarm || !alarm.enabled) return;
    if (alarm.repeat == 0) {
      updateAlarmEnabled(alarmId, false);
      return;
    }
    await scheduleAlarm(alarm);
  }
});


AppRegistry.registerComponent(appName, () => App);
