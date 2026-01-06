import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BillingScreen from './src/screens/BillingScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { View, Text } from 'react-native';
import { useEffect } from 'react';
import { useStore } from './src/state/store';

export default function App() {
  const initializeStore = useStore(state => state.initialize);

  useEffect(() => {
    initializeStore();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <AppTabs />
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Billing" component={BillingScreen} options={{ tabBarLabel: 'Billing' }} />
      <Tab.Screen name="Orders" component={OrdersScreen} options={{ tabBarLabel: 'Orders' }} />
      <Tab.Screen name="Reports" component={ReportsScreen} options={{ tabBarLabel: 'Reports' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'Settings' }} />
    </Tab.Navigator>
  );
}
