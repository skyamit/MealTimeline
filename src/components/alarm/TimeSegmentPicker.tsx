import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type Props = {
  value: Date;
  onChange: (date: Date) => void;
};

const pad = (n: number) => n.toString().padStart(2, '0');

const TimeSegmentPicker: React.FC<Props> = ({ value, onChange }) => {
  const hours24 = value.getHours();
  const minutes = value.getMinutes();

  const isAM = hours24 < 12;
  const hour12 = hours24 % 12 || 12;

  const setHour = (h: number) => {
    const newDate = new Date(value);
    newDate.setHours(isAM ? h % 12 : (h % 12) + 12);
    onChange(newDate);
  };

  const setMinute = (m: number) => {
    const newDate = new Date(value);
    newDate.setMinutes(m);
    onChange(newDate);
  };

  const setPeriod = (period: 'AM' | 'PM') => {
    const newDate = new Date(value);
    let h = newDate.getHours();
    if (period === 'AM' && h >= 12) newDate.setHours(h - 12);
    if (period === 'PM' && h < 12) newDate.setHours(h + 12);
    onChange(newDate);
  };

  return (
    <View style={styles.container}>
      <Segment value={pad(hour12)} onPress={() => setHour((hour12 % 12) + 1)} />
      <Separator />
      <Segment value={pad(minutes)} onPress={() => setMinute((minutes + 1) % 60)} />
      <Separator />
      <Period value={isAM ? 'AM' : 'PM'} onToggle={setPeriod} />
    </View>
  );
};

const Segment = ({ value, onPress }: any) => (
  <Pressable onPress={onPress} style={styles.segment}>
    <Text style={styles.segmentText}>{value}</Text>
  </Pressable>
);

const Period = ({ value, onToggle }: any) => (
  <Pressable
    style={styles.segment}
    onPress={() => onToggle(value === 'AM' ? 'PM' : 'AM')}
  >
    <Text style={styles.segmentText}>{value}</Text>
  </Pressable>
);

const Separator = () => <View style={styles.dot} />;

export default TimeSegmentPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#EAF3FF',
    borderRadius: 12,
    padding: 6,
    alignItems: 'center',
    width: '100%'
  },

  segment: {
    minWidth: '28%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
  },

  segmentText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A8A',
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#B6C7E2',
    marginHorizontal: 6,
  },
});

