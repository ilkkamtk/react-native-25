import {StatusBar} from 'expo-status-bar';
import Navigator from './navigators/Navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {UserProvider} from './contexts/UserContext';
import {UpdateProvider} from './contexts/UpdateContext';

const App = () => {
  console.log('App loaded!');
  return (
    <SafeAreaProvider>
      <UserProvider>
        <UpdateProvider>
          <Navigator />
        </UpdateProvider>
      </UserProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

export default App;
