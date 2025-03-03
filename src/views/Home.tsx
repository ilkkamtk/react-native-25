import {FlatList, View, StyleSheet, useWindowDimensions} from 'react-native';
import {useMedia} from '../hooks/apiHooks';
import MediaListItem from '../components/MediaListItem';
import {useUpdateContext} from '../hooks/ContextHooks';
import {useHeaderHeight} from '@react-navigation/elements';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const Home = () => {
  const {mediaArray, loading} = useMedia();
  const {triggerUpdate} = useUpdateContext();
  const {height} = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const bottomTabHeight = useBottomTabBarHeight();

  // Calculate available height for item (screen height minus navigation elements)
  const itemHeight = height - headerHeight - bottomTabHeight;

  const onRefresh = async () => {
    triggerUpdate();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mediaArray}
        renderItem={({item}) => (
          <MediaListItem item={item} itemHeight={itemHeight} />
        )}
        onRefresh={onRefresh}
        refreshing={loading}
        pagingEnabled={true} // Enable paging for full-screen items
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
