import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

type MediaItemProps = {
  item: MediaItemWithOwner;
};

const MediaListItem = ({item}: MediaItemProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log(item.title + ' clicked');
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
      <Text>Uploaded: {new Date(item.created_at).toLocaleString('fi-FI')}</Text>
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
