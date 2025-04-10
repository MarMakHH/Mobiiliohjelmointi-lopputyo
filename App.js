import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LearnScreen from './components/LearnScreen';
import CreateScreen from './components/CreateScreen';
import SettingsScreen from './components/SettingsScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({  // Navigator can be customized using screenOptions
          tabBarIcon: ({ focused, color, size }) => { 
            // Function tabBarIcon is given the focused state,
	    // color and size params
            let iconName;

            if (route.name === 'Learn') {
              iconName = 'book';
            } else if (route.name === 'Create') {
              iconName = 'create';
            } else if (route.name === 'Settings') {
              iconName = 'settings'
            }

            return <Ionicons name={iconName} size={size} color={color} />;   //it returns an icon component
          },
        })}>
        <Tab.Screen name='Learn' component={LearnScreen} />
        <Tab.Screen name='Create' component={CreateScreen} />
        <Tab.Screen name='Settings' component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
