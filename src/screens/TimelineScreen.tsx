import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyles from "../theme/style";

const TimelineScreen: React.FC = () => {
  return (
    <SafeAreaView style={[commonStyles.screenBackground, {flex : 1}]} edges={['top']}>
        <View style={[]}>
        </View> 
    </SafeAreaView>
  );
}

export default TimelineScreen;