import {RouteProp} from '@react-navigation/native';
import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Video} from 'expo-av';

const Single = ({route}: any) => {
  const item: MediaItemWithOwner = route.params.item;

  return (
    <View>
      <Text>{item.title}</Text>
      <Text>{new Date(item.created_at).toLocaleString('fi-FI')}</Text>
      {item.media_type.includes('image') ? (
        <Image style={styles.image} src={item.filename} />
      ) : (
        <Video style={styles.image} source={{uri: item.filename}} useNativeControls />
      )}
      {/* <Likes item={item} /> */}
      <Text>{item.description}</Text>
      <Text>Owner: {item.username}</Text>
      <Text>Type: {item.media_type}</Text>
      <Text>Size: {Math.round(item.filesize / 1024)} kB</Text>
      {/* <Comments item={item} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5a5',
    marginBottom: 10,
  },
  image: {height: 400},
});

export default Single;
