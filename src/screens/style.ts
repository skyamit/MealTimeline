import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface CommonStyles {
  card: ViewStyle;
  inputCard:ViewStyle;
  horizontalLine: ViewStyle;
  fullHorizontalLine: ViewStyle;
  label: TextStyle;
  circle: ViewStyle;
  smallCircle: ViewStyle;
}

const commonStyles = StyleSheet.create<CommonStyles>({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
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
  inputCard : {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
  },
  fullHorizontalLine : {
    borderBottomWidth: 1,
    width: '99%',
    borderBottomColor: 'rgba(235, 235, 235, 1)',
    paddingTop: 5,
    marginBottom: 0,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    width: '90%',
    borderBottomColor: 'rgba(177, 177, 177, 1)',
    paddingTop: 5,
    marginBottom: 5,
  },
  label : {
    fontSize: 14, 
    fontWeight: 500
  }, 
  circle : {
    width: 35, 
    height: 35, 
    backgroundColor: '#aeaeaeff', 
    borderWidth: 1,
    borderRadius: 20,
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    margin:2,
    borderColor: '#9e9e9eff', 
  }, 
    smallCircle : {
    width: 25, 
    height: 25, 
    backgroundColor: '#aeaeaeff', 
    borderWidth: 1,
    borderRadius: 20,
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    margin:2,
    borderColor: '#9e9e9eff', 
  }, 
});

export default commonStyles;