import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyles from "../theme/style";

const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={[commonStyles.screenBackground, {flex : 1}]} edges={['top']}>
        <View style={[styles.container]}>

        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {

    }
});

export default ProfileScreen;