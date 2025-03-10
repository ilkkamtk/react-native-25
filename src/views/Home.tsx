import {FlatList, View, StyleSheet, useWindowDimensions} from 'react-native';
import {useMedia} from '../hooks/apiHooks';
import MediaListItem from '../components/MediaListItem';
import {useUpdateContext} from '../hooks/ContextHooks';
import {useHeaderHeight} from '@react-navigation/elements';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useCallback} from 'react';
import {MediaItemWithOwner} from 'hybrid-types/DBTypes';

const Home = () => {
  const {mediaArray, loading} = useMedia(true);
  const {triggerUpdate} = useUpdateContext();
  const {height} = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const bottomTabHeight = useBottomTabBarHeight();

  // Calculate available height for item (screen height minus navigation elements)
  const itemHeight = height - headerHeight - bottomTabHeight;

  const onRefresh = useCallback(() => {
    triggerUpdate();
  }, [triggerUpdate]);

  const renderItem = useCallback(
    ({item}: {item: MediaItemWithOwner}) => (
      <MediaListItem item={item} itemHeight={itemHeight} />
    ),
    [itemHeight],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mediaArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.media_id.toString()}
        onRefresh={onRefresh}
        refreshing={loading}
        pagingEnabled={true} // Enable paging for full-screen items
        showsHorizontalScrollIndicator={false}
        windowSize={3} // Optimize FlatList performance
        removeClippedSubviews={true} // Optimize FlatList performance
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
