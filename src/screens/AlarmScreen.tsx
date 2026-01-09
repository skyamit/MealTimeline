import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import DebugToast from '../components/DebugToast';
import AlarmList from '../components/alarm/AlarmList';
type Props = {
  showHideAlaramProp: () => void;
};
export default function AlarmScreen({ showHideAlaramProp }: Props) {
  const [showToast, setShowToast] = useState(false);
  
  return (
    <View style={styles.overlay}>
      <View style={styles.popup}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => showHideAlaramProp()}
        >
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <AlarmList />
        </View>
      </View>
      {showToast && <DebugToast message={'Toast message'} />}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 15,
    height: 15,
    tintColor: '#fff',
  },
  alarmIcon: {
    width: 18,
    height: 18,
  },
  container: {},
  currentDate: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    maxHeight: '70%',
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  selectedTime: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    color: '#000',
    backgroundColor: '#fff',
  },
  alarmDateUpdate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 12,
    backgroundColor: '#444',
    borderRadius: 8,
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#2196f3',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  alarmList: {
    maxHeight: '70%',
    overflow: 'scroll',
  },
  alarmItem: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  alarmContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  alarmText: {
    fontSize: 15,
    color: '#818181ff',
    fontWeight: 500,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  popup: {
    width: '95%',
    // padding: 20,
    borderRadius: 12,
    backgroundColor: '#e1e8f8',
    overflow:'hidden',
    elevation: 10,
    height: '90%'
  },
  closeButton: {
    width: 25,
    height: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.53)',
    position: 'absolute',
    right: 5,
    top: 5,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    zIndex: 100,
  },
  deleteButton: {
    width: 25,
    height: 25,
    backgroundColor: 'rgba(97, 97, 97, 0.68)',
    position: 'absolute',
    right: 2,
    top: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
