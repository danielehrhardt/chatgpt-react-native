import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from './src/screens/ChatScreen';
import { TouchableOpacity } from 'react-native';
import SettingsScreen from './src/screens/SettingsScreen';
import {Text} from 'react-native';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={({navigation}) => ({
          title: 'ChatGPT',
          headerRight: () => (
            <TouchableOpacity
              style={{paddingHorizontal: 15}}
              onPress={() => navigation.navigate('SettingsScreen')}>
              <Text style={{color: '#1a73e8'}}>Settings</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{title: 'Settings'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;
