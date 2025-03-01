import {FlatList, View} from 'react-native';
import {useMedia} from '../hooks/apiHooks';
import MediaListItem from '../components/MediaListItem';
import {useUpdateContext} from '../hooks/ContextHooks';

const Home = () => {
  const {mediaArray, loading} = useMedia();

  const {triggerUpdate} = useUpdateContext();

  const onRefresh = async () => {
    triggerUpdate();
  };

  return (
    <View>
      <FlatList
        data={mediaArray}
        renderItem={({item}) => <MediaListItem item={item} />}
        onRefresh={onRefresh}
        refreshing={loading}
      />
    </View>
  );
};

export default Home;
