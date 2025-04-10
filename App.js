import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LearnScreen from './components/LearnTab/LearnScreen';
import CreateScreen from './components/CreateTab/CreateScreen';
import SettingsScreen from './components/SettingsScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddWords from './components/CreateTab/AddWords';
import CardMode from './components/LearnTab/CardMode';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {

          let iconName;

          if (route.name === 'Learn') {
            iconName = 'book';
          } else if (route.name === 'Create') {
            iconName = 'create';
          } else if (route.name === 'Settings') {
            iconName = 'settings'
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
        <Tab.Screen name='Learn' component={LearnStackNavigator} options={{ headerShown: false }}/>
        <Tab.Screen name='Create' component={CreateStackNavigator} options={{ headerShown: false }}/>
        <Tab.Screen name='Settings' component={SettingsScreen} />
      </Tab.Navigator>
  );
}

function LearnStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Learn' component={LearnScreen}/>
      <Stack.Screen name='Wordcards' component={CardMode}/>
    </Stack.Navigator>
  )
}

function CreateStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Create' component={CreateScreen} />
      <Stack.Screen name='Add Words' component={AddWords}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
