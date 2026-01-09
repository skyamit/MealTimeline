import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Image
} from 'react-native';

interface Props {
  dateTime: Date;
  setDateTimeProp: React.Dispatch<React.SetStateAction<Date>>;
}

export default function TimePicker({ setDateTimeProp, dateTime }: Props) {
  const [showDateTime, setShowDateTime] = useState('None');
  const setTime = (_event: any, selectedTime?: Date) => {
    setShowDateTime('None');
    if (!selectedTime) return;
    setDateTimeProp(prev => {
      const updated = new Date(prev);
      updated.setHours(
        selectedTime.getHours(),
        selectedTime.getMinutes(),
        0,
        0,
      );
      return updated;
    });
  };

  const setDate = (_event: any, selectedDate?: Date) => {
    setShowDateTime('None');
    if (!selectedDate) return;
    setDateTimeProp(prev => {
      const updated = new Date(prev);
      updated.setFullYear(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      );
      return updated;
    });
  };

  return (
    <View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowDateTime('Date')}
        >
          <Image
            source={require('../../assets/calendar.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowDateTime('Time')}
        >
          <Image
            source={require('../../assets/timer.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {showDateTime == 'Date' && (
        <DateTimePicker
          value={dateTime}
          mode="date"
          is24Hour={false}
          display={Platform.OS === 'android' ? 'spinner' : 'default'}
          onChange={setDate}
        />
      )}
      {showDateTime == 'Time' && (
        <DateTimePicker
          value={dateTime}
          mode="time"
          is24Hour={false}
          display={Platform.OS === 'android' ? 'spinner' : 'default'}
          onChange={setTime}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap:4,
  },
  icon: {
  width: 22,
  height: 22,
  tintColor: '#fff', // optional
},
  button: {
    padding: 12,
    backgroundColor: '#444',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
