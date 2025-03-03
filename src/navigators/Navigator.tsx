import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import Profile from '../views/Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Single from '../views/Single';
import {Icon} from '@rneui/base';
import {useUserContext} from '../hooks/ContextHooks';
import Login from '../views/Login';
import MyFiles from '../views/MyFiles';
import Upload from '../views/Upload';
import {NavigatorType} from '../types/LocalTypes';
import Modal from '../views/Modal';

const Tab = createBottomTabNavigator<NavigatorType>();
const Stack = createNativeStackNavigator<NavigatorType>();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';
          if (route.name === 'All Media') {
            iconName = focused ? 'home-filled' : 'home';
          } else if (route.name === 'My Profile') {
            iconName = 'person';
          } else if (route.name === 'Upload') {
            iconName = 'cloud-upload';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="All Media" component={Home} />
      <Tab.Screen name="My Profile" component={Profile} />
      <Tab.Screen name="Upload" component={Upload} />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {user} = useUserContext();
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Single" component={Single} />
          <Stack.Screen name="My Files" component={MyFiles} />
          <Stack.Screen name="Modal" component={Modal} />
        </>
      ) : (
        <Stack.Screen name="My media app - login" component={Login} />
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
