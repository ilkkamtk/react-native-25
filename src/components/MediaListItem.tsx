import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {NavigatorType} from '../types/LocalTypes';

type MediaItemProps = {
  item: MediaItemWithOwner;
};

const MediaListItem = ({item}: MediaItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<NavigatorType>>();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log(item.title + ' clicked');
        navigation.navigate('Single', {item});
      }}
    >
      <Image
        style={styles.image}
        source={{
          uri:
            item.thumbnail ||
            (item.screenshots && item.screenshots[2]) ||
            undefined,
        }}
      />
      <Text>{item.title}</Text>
      <Text>
        Uploaded: {new Date(item.created_at).toLocaleString('fi-FI')} by:{' '}
        {item.username}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5a5',
    marginBottom: 10,
  },
  image: {height: 300},
});

export default MediaListItem;
