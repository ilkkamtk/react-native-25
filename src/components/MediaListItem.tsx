import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {NavigatorType} from '../types/LocalTypes';

type MediaItemProps = {
  item: MediaItemWithOwner;
  itemHeight: number;
};

const MediaListItem = ({item, itemHeight}: MediaItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<NavigatorType>>();
  const {width} = useWindowDimensions();

  return (
    <TouchableOpacity
      style={[styles.container, {height: itemHeight, width: width}]}
      onPress={() => {
        console.log(item.title + ' clicked');
        navigation.navigate('Single', {item});
      }}
    >
      <Image
        style={styles.image}
        source={{
          uri: item.thumbnail || undefined,
        }}
        onError={(e) => console.log(e)}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.info}>
          Uploaded: {new Date(item.created_at).toLocaleString('fi-FI')} by:{' '}
          {item.username}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 0,
    justifyContent: 'space-between',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFF',
  },
  info: {
    fontSize: 14,
    color: '#FFF',
  },
});

export default MediaListItem;
