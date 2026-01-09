import React, { useRef, useState } from 'react';
import {
  View,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import commonStyles from '../../theme/style';

const SWITCH_WIDTH = 60;
const SWITCH_HEIGHT = 35;
const KNOB_SIZE = 27;
const PADDING = 4;
const MAX_TRANSLATE = SWITCH_WIDTH - KNOB_SIZE - PADDING * 2;

type Prop = {
  onChange: (state: boolean) => void;
  value: boolean;
};
export default function AlarmToggle({ value = false, onChange }: Prop) {
  const [isOn, setIsOn] = useState(value);

  const translateX = useRef(
    new Animated.Value(value ? MAX_TRANSLATE : 0),
  ).current;

  const toggle = (newState: boolean) => {
    setIsOn(newState);
    onChange?.(newState);

    Animated.spring(translateX, {
      toValue: newState ? MAX_TRANSLATE : 0,
      useNativeDriver: true,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        const dx = Math.min(Math.max(0, gesture.dx), MAX_TRANSLATE);
        translateX.setValue(isOn ? MAX_TRANSLATE + dx : dx);
      },
      onPanResponderRelease: (_, gesture) => {
        toggle(gesture.dx > MAX_TRANSLATE / 2);
      },
    }),
  ).current;

  return (
    <TouchableWithoutFeedback onPress={() => toggle(!isOn)}>
      <View style={[styles.container, isOn && styles.on, styles.toggleShadow]}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.knob,  styles.shadow, { transform: [{ translateX }] }]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SWITCH_WIDTH,
    height: SWITCH_HEIGHT,
    borderRadius: SWITCH_HEIGHT / 2,
    backgroundColor: '#aeaeaeff',
    padding: PADDING,
    justifyContent: 'center',
  },
  on: {
    backgroundColor: '#2bbe30ff',
  },
  knob: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    backgroundColor: '#fff',
    elevation: 2,
  },
  shadow: {
  backgroundColor: '#fff', // REQUIRED for iOS shadow
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.5,
  elevation: 2, // Android
},
toggleShadow: {
  shadowColor: '#828282ff',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.18,
  shadowRadius: 6,
  elevation: 5, // Android
},
});
