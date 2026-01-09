import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import commonStyles from '../../screens/style';

type Prop = {
  daysProp: string[];
  setDaysProp: React.Dispatch<React.SetStateAction<string[]>>;
};

const AlarmDays: React.FC<Prop> = ({ daysProp, setDaysProp }: Prop) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
  const isSelected = (day: string) => {
    return daysProp.includes(day);
  };
  const clicked = (day: string) => {
    if (isSelected(day)) {
      setDaysProp(prev => prev.filter(d => d !== day));
    } else {
      setDaysProp(prev => [...prev, day]);
    }
  };

  return (
    <View style={styles.daysView}>
      <FlatList
        style={styles.daysList}
        data={days}
        keyExtractor={item => item}
        horizontal={true}
        renderItem={({ item }) => (
          <Pressable onPress={() => clicked(item)}>
            <View style={[commonStyles.circle, isSelected(item)?styles.selected:""]}>
              <Text style={styles.text}>{item.charAt(0)}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  daysView: {
    alignItems: 'center',
  },
  daysList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    fontWeight: 700,
    color: '#FFF',
  },
  selected: {
    backgroundColor: '#5880e6ff',
  },
});
export default AlarmDays;
