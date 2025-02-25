import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Text, View} from 'react-native';

type MediaItemProps = {
  item: MediaItemWithOwner;
};

const MediaListItem = ({item}: MediaItemProps) => {
  return (
    <View>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );
};

export default MediaListItem;
