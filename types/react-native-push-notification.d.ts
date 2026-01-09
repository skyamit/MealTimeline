declare module 'react-native-push-notification' {
  interface PushNotification {
    message: string;
    title?: string;
    playSound?: boolean;
    soundName?: string;
    channelId?: string;
    date?: Date;
    allowWhileIdle?: boolean;
    repeatType?: 'time' | 'day' | 'week' | 'month';
    repeatTime?: number;
  }

  interface PushNotificationStatic {
    configure(options: {
      onNotification?: (notification: any) => void;
      requestPermissions?: boolean;
    }): void;

    localNotification(notification: PushNotification): void;

    localNotificationSchedule(notification: PushNotification): void;

    createChannel(
      channel: {
        channelId: string;
        channelName: string;
        channelDescription?: string;
        soundName?: string;
        importance?: number;
        vibrate?: boolean;
      },
      callback: (created: boolean) => void
    ): void;
  }

  const PushNotification: PushNotificationStatic;
  export default PushNotification;
}
