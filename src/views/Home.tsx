import {FlatList, Text, View} from 'react-native';
import {useMedia} from '../hooks/apiHooks';
import MediaListItem from '../components/MediaListItem';

const Home = () => {
  const {mediaArray} = useMedia();

  console.log(mediaArray);

  return (
    <View>
      <Text>My Media</Text>
      <FlatList data={mediaArray} renderItem={({item}) => <MediaListItem item={item} />} />
    </View>
  );
};

export default Home;
