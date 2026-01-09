import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Alarm } from '../model/Alarm';
import { loadAlarms, updateAlarmEnabled } from '../components/alarmStorage';
import commonStyles from '../theme/style';
import AlarmTime from '../components/alarm/AlarmTime';
import AlarmForm from '../components/alarm/AlarmForm';
import { SafeAreaView } from 'react-native-safe-area-context';

const AlarmList: React.FC = () => {
  const [showAlarmForm, setShowAlarmForm] = useState(false);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [updated, setUpdated] = useState(0);
  useEffect(() => {
    // cleanAlarm();
    loadAllAlarms();
  }, [updated]);
  const updateAlarmFn = async (id: string, enabled: boolean) => {
    await updateAlarmEnabled(id, enabled);
    setAlarms(prev =>
      prev.map(alarm => (alarm.id === id ? { ...alarm, enabled } : alarm)),
    );
    setUpdated(old => old + 1);
  };
  const loadAllAlarms = async () => {
    const allAlarms = await loadAlarms();
    setAlarms(allAlarms);
  };
  const setShowAlarmFormFn = () => {
    setShowAlarmForm(curr => !curr);
  };
  return (
    <SafeAreaView style={[commonStyles.screenBackground, { flex: 1 }]} edges={['top']}>
      <View style={[styles.alarmList, ]}>
        <View style={styles.titleImageView}>
          <Text style={styles.titleImageDesc}>
            Set reminders for mealtime or medication.
          </Text>
          <Image
            source={require('../../assets/alarm/alarmTitle.png')}
            style={styles.alarmTitleImage}
          />
        </View>
        {showAlarmForm && (
          <AlarmForm
            setShowAlarmFormProp={setShowAlarmFormFn}
            loadAllAlarmsProp={loadAllAlarms}
          />
        )}
        {!showAlarmForm && (
          <>
            <Pressable
              onPress={setShowAlarmFormFn}
              style={{ width: '100%', alignItems: 'center' }}
            >
              <View style={[commonStyles.card, styles.createAlarm, commonStyles.screenBackground]}>
                <View style={styles.addAlarmComp}>
                  <Image
                    source={require('../../assets/alarm/plus.png')}
                    style={styles.alarmAddImage}
                  />
                  <Text style={styles.addAlarmText}>Add Alarm</Text>
                </View>
                <View style={commonStyles.fullHorizontalLine} />
                <View>
                  <Text>Create new reminder for meal or medication.</Text>
                </View>
              </View>
            </Pressable>
            <View style={styles.alarmListScroll}>
              <FlatList
                style={styles.alarmListStyle}
                data={alarms}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <AlarmTime
                    loadAllAlarmsProp={loadAllAlarms}
                    alarmProp={item}
                    updateAlarmEnabled={updateAlarmFn}
                  />
                )}
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AlarmList;

const styles = StyleSheet.create({
  alarmList: {
    alignItems: 'center',
  },

  // create alarm -
  createAlarm: {
    width: '90%',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    display: 'flex',
    alignItems: 'center',
    borderWidth: 1,
    margin: 10,
    backgroundColor: '#bfd2ffff',
    borderRadius: 15,
    borderColor: '#dbdbdbff',
  },
  addAlarmComp: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  alarmAddImage: {
    width: 30,
    height: 30,
  },
  addAlarmText: {
    fontSize: 18,
    fontWeight: 600,
    marginLeft: 8,
  },
  // Alarm list
  alarmListScroll: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    // marginBottom: 10,
  },
  alarmListStyle: {
    width: '90%',
    paddingBottom: '110%',
  },

  // heading view
  titleImageView: {
    width: '100%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },

  alarmTitleImage: {
    width: '100%',
    height: '100%',
  },
  titleImageDesc: {
    position: 'absolute',
    bottom: 20,
    zIndex: 9,
    backgroundColor: '#FFF',
    paddingLeft: 10,
    paddingRight: 10,
    padding: 5,
    borderRadius: 10,
    fontWeight: 500,
  },
});
