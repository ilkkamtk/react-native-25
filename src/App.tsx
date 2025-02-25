import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet} from 'react-native';
import Home from './views/Home';

const App = () => {
  console.log('App loaded!');
  return (
    <SafeAreaView style={styles.container}>
      <Home />
      <StatusBar style="auto" />
    </SafeAreaView>
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

export default App;
