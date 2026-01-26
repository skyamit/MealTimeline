import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const colors = {
  background: '#F5F8FB',
  card: '#FFFFFF',
  primary: '#4A90E2',
  accent: '#E3F2FD',
  border: '#E0E6ED',
  textPrimary: '#222222',
  textSecondary: '#666666',
  textButton: '#FFFFFF',
  circleBackground: '#c8c8c8ff',
  inactive: '#8a8a8aff',
  buttonColor: '#1b61b3ff',
  carbs: '#4A90E2',
  protein: '#27AE60',
  fats: '#F2994A',
};

interface CommonStyles {
  card: ViewStyle;
  inputCard: ViewStyle;
  horizontalLine: ViewStyle;
  fullHorizontalLine: ViewStyle;
  label: TextStyle;
  circle: ViewStyle;
  smallCircle: ViewStyle;
  screenBackground: ViewStyle;
  bottomCard: ViewStyle;
  cardNoBackground: ViewStyle;
  submit: ViewStyle;
  submitText: TextStyle;
  cancel: ViewStyle;
}

const commonStyles = StyleSheet.create<CommonStyles>({
  submit: {
    borderWidth: 1,
    backgroundColor: colors.buttonColor,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancel: {
    borderWidth: 1,
    backgroundColor: colors.inactive,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: colors.textButton,
    fontWeight: 600,
  },
  cardNoBackground: {
    backgroundColor: colors.card,
    borderRadius: 13,
    padding: 10,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 15,
    padding: 16,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  bottomCard: {
    backgroundColor: colors.card,
    padding: 16,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    elevation: 5,
  },
  inputCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 10,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  fullHorizontalLine: {
    borderBottomWidth: 1,
    width: '99%',
    borderBottomColor: colors.border,
    paddingTop: 5,
    marginBottom: 0,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    width: '90%',
    borderBottomColor: colors.border,
    paddingTop: 5,
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
  },
  circle: {
    width: 35,
    height: 35,
    backgroundColor: colors.circleBackground,
    borderWidth: 1,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderColor: colors.border,
  },
  smallCircle: {
    width: 25,
    height: 25,
    backgroundColor: colors.circleBackground,
    borderWidth: 1,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderColor: colors.border,
  },
  screenBackground: {
    backgroundColor: colors.background,
  },
});

export default commonStyles;
