import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import commonStyles from '../../theme/style';

type Prop = {
  daysProp: string[];
};

const AlarmDayView: React.FC<Prop> = ({ daysProp }: Prop) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
  const isSelected = (day: string) => {
    return daysProp.includes(day);
  };

  return (
    <View style={styles.daysView}>
      {daysProp.length > 0 && (
        <FlatList
          style={styles.daysList}
          data={days}
          keyExtractor={item => item}
          horizontal={true}
          renderItem={({ item }) => (
            <View
              style={[
                commonStyles.smallCircle,
                isSelected(item) ? styles.selected : '',
              ]}
            >
              <Text style={styles.text}>{item.charAt(0)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  daysView: {
    alignItems: 'center',
    marginLeft: 8
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
export default AlarmDayView;
