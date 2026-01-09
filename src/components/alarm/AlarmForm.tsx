import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import commonStyles from '../../theme/style';
import AlarmToggle from './AlarmToggle';
import { useState } from 'react';
import AlarmDays from './AlarmDays';
import TimeSegmentPicker from './TimeSegmentPicker';
import { Alarm } from '../../model/Alarm';
import { addAlarm } from '../AlarmQueue';

type Prop = {
  setShowAlarmFormProp: () => void;
  loadAllAlarmsProp: () => void;
};
const AlarmForm: React.FC<Prop> = ({
  setShowAlarmFormProp,
  loadAllAlarmsProp,
}: Prop) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [date, setDate] = useState(new Date());
  const [alarmType, setAlarmType] = useState('meal');
  const [label, setLabel] = useState('');
  const [days, setDays] = useState<string[]>([]);
  const initialAlarm: Alarm = {
    id: '',
    hour: 0,
    minute: 0,
    label: 'Reminder from MealTimeline',
    alarmType: 'meal',
    repeat: [],
    enabled: true,
  };
  const [alarm, setAlarm] = useState<Alarm>(initialAlarm);

  const saveAlarm = async () => {
    alarm.hour = date.getHours();
    alarm.minute = date.getMinutes();
    alarm.label = label;
    alarm.alarmType = alarmType;
    alarm.enabled = isEnabled;
    alarm.repeat = days;
    alarm.id = Date.now().toLocaleString();
    await addAlarm(alarm);
    setShowAlarmFormProp();
    loadAllAlarmsProp();
  };
  return (
    <>
      <View style={[commonStyles.card, styles.container]}>
        <Text style={styles.newAlarmText}>Set New Alarm</Text>
        {/* <Text>
          {
            "isEnabled " + isEnabled.toString() + " hour: " + date.getHours() + " min: " + date.getMinutes() + " Label: " + label + " AlarmType : " + alarmType + " days: " + days
          }
        </Text> */}
        <View style={commonStyles.fullHorizontalLine} />
        <View>
          <Text style={commonStyles.label}>Time:</Text>
          <View style={styles.timeView}>
            <TimeSegmentPicker value={date} onChange={setDate} />
          </View>
        </View>
        <View style={commonStyles.fullHorizontalLine} />
        <View style={[styles.repeatView]}>
          <Text style={commonStyles.label}>Repeat: </Text>
          <AlarmDays daysProp={days} setDaysProp={setDays} />
        </View>
        <View style={commonStyles.fullHorizontalLine} />
        <View style={[styles.labelView]}>
          <Text style={commonStyles.label}>Label:</Text>
          <TextInput
            placeholder="Breakfast Reminder"
            placeholderTextColor="#393939ff"
            value={label}
            onChangeText={setLabel}
            style={[styles.input, commonStyles.inputCard]}
          />
        </View>
        <View style={commonStyles.fullHorizontalLine} />
        <View>
          <Text style={commonStyles.label}>Alarm Type: </Text>
          <View style={styles.alarmType}>
            <Pressable
              onPress={() => setAlarmType('meal')}
              style={{ width: '50%' }}
            >
              <View
                style={[
                  alarmType == 'meal' ? styles.isSelected : '',
                  styles.alarmTypeOption,
                ]}
              >
                <Text
                  style={[
                    alarmType == 'meal' ? { color: '#FFF' } : '',
                    styles.reminder,
                  ]}
                >
                  Meal Reminder
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => setAlarmType('medication')}
              style={{ width: '50%' }}
            >
              <View
                style={[
                  alarmType == 'medication' ? styles.isSelected : '',
                  styles.alarmTypeOption,
                ]}
              >
                <Text
                  style={[
                    alarmType == 'medication' ? { color: '#FFF' } : '',
                    styles.reminder,
                  ]}
                >
                  Medication Reminder
                </Text>
              </View>
            </Pressable>
          </View>
          <Text style={styles.reminderMessage}>
            Get notified for mealtimes or medication.
          </Text>
        </View>
        <View style={commonStyles.fullHorizontalLine} />
        <View style={styles.enabledView}>
          <Text style={commonStyles.label}>Enable Alarm: </Text>
          <AlarmToggle value={isEnabled} onChange={setIsEnabled} />
        </View>
      </View>
      <View style={styles.saveCancelView}>
        <Pressable
          style={[
            commonStyles.inputCard,
            styles.submitButton,
            { backgroundColor: '#e1e1e1ff' },
          ]}
          onPress={setShowAlarmFormProp}
        >
          <Text style={{ fontWeight: 600, fontSize: 16 }}>Cancel</Text>
        </Pressable>
        <Pressable
          style={[
            commonStyles.inputCard,
            styles.submitButton,
            { backgroundColor: '#5880e6ff' },
          ]}
          onPress={saveAlarm}
        >
          <Text style={{ fontWeight: 600, fontSize: 16, color: '#FFFFFF' }}>
            Save
          </Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginBottom: 10,
    alignItems: 'center',
  },
  newAlarmText: {
    fontWeight: 600,
    fontSize: 16,
  },

  //time view
  timeView: {
    width: '100%',
    padding: 10,
  },
  //repeat view
  repeatView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  // label view
  labelView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5, 
    paddingBottom: 2,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 15,
    height: 40,
    paddingLeft: 12,
    paddingRight: 12,
    borderColor: '#ccccccff',
    color: '#000',
    width: '70%',
    fontWeight: 400,
  },
  // alarm type
  alarmType: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  alarmTypeOption: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: '98%',
    alignItems: 'center',
    borderColor: '#ccccccff',
  },
  isSelected: {
    backgroundColor: '#5880e6ff',
    color: '#FFF',
  },
  reminder: {
    fontSize: 12,
    fontWeight: 500,
  },
  reminderMessage: {
    marginTop: 3,
    color: '#6a6a6aff',
  },
  // alarm enabled
  enabledView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 3, 
  
  },

  //saveCance vieww
  saveCancelView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: 5,
  },
  submitButton: {
    width: '47%',
    borderWidth: 1,
    borderRadius: 15,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 5,
    borderColor: '#c7c7c7ff',
  },
});

export default AlarmForm;
