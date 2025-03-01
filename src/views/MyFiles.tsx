import React from 'react';
import {FlatList, View} from 'react-native';
import MediaListItem from '../components/MediaListItem';
import {useMedia} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/ContextHooks';

const MyFiles = () => {
  const {user} = useUserContext();
  const {mediaArray} = useMedia(user?.user_id);
  return (
    <View>
      <FlatList
        data={mediaArray}
        renderItem={({item}) => <MediaListItem item={item} />}
      />
    </View>
  );
};

export default MyFiles;
