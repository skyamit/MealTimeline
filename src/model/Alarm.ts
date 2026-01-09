export interface Alarm {
  id: string;
  minute: number;
  hour: number;
  label?: string;    // Breakfast, Lunch, etc
  alarmType: String;
  repeat: string[];
  enabled: boolean;
}
