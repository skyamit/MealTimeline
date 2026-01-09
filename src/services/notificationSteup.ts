import notifee, {
  AndroidImportance,
  AuthorizationStatus,
} from '@notifee/react-native';

export async function setupNotifications() {
  const permission = await notifee.requestPermission();

  if (permission.authorizationStatus < AuthorizationStatus.AUTHORIZED) {
    console.log('Notification permission denied');
    return;
  }

  await notifee.createChannel({
    id: 'meal',
    name: 'Meal Alarms',
    importance: AndroidImportance.HIGH,
    sound: 'alarm',
    vibration: true,
    bypassDnd: true,
  });

  const settings = await notifee.getNotificationSettings();

  if (settings.android?.alarm !== 1) {
    await notifee.openAlarmPermissionSettings();
  }
}
