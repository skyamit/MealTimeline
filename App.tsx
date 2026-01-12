import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import { useEffect } from 'react';
import { setupNotifications } from './src/services/notificationSteup';
import BottomTabs from './src/components/BottomNavigation';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  const isDarkMode: boolean = useColorScheme() === 'dark';
  useEffect(() => {
    async function init() {
      await setupNotifications();
    }
    init();
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  light: {
    backgroundColor: '#FFFFFF',
  },
  dark: {
    backgroundColor: '#000000',
  },
});

export default App;
