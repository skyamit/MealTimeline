import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import { useEffect } from 'react';
import { setupNotifications } from './src/services/notificationSteup';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    async function init() {
      await setupNotifications();
    }
    init();
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <HomeScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;