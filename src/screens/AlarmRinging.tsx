import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  visible: boolean;
  onStop: () => void;
};

export default function AlarmRinging({ visible, onStop }: Props) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Text style={styles.title}>⏰ Alarm</Text>
      <Text style={styles.time}>Wake Up!</Text>

      <TouchableOpacity style={styles.stopButton} onPress={onStop}>
        <Text style={styles.stopText}>STOP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    marginBottom: 20,
  },
  time: {
    color: '#ccc',
    fontSize: 20,
    marginBottom: 40,
  },
  stopButton: {
    backgroundColor: 'red',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 50,
  },
  stopText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
