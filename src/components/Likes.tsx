import {Like, MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useEffect, useReducer} from 'react';
import {useLike} from '../hooks/apiHooks';
import {View} from 'react-native';
import {Button, Text} from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LikeState = {
  count: number;
  userLike: Like | null;
};

type LikeAction = {
  type: 'setLikeCount' | 'like';
  like?: Like | null;
  count?: number;
};

const likeInitialState: LikeState = {
  count: 0,
  userLike: null,
};

const likeReducer = (state: LikeState, action: LikeAction): LikeState => {
  switch (action.type) {
    case 'setLikeCount':
      return {...state, count: action.count ?? 0};
    case 'like':
      return {...state, userLike: action.like ?? null};
    default:
      return state;
  }
};

const Likes = ({item}: {item: MediaItemWithOwner}) => {
  const [likeState, likeDispatch] = useReducer(likeReducer, likeInitialState);
  const {postLike, deleteLike, getCountByMediaId, getUserLike} = useLike();

  // get user like
  const getLikes = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!item || !token) {
      return;
    }
    try {
      const userLike = await getUserLike(item.media_id, token);
      //console.log('getLikes userLike', userLike);
      likeDispatch({type: 'like', like: userLike});
    } catch (e) {
      likeDispatch({type: 'like', like: null});
      console.log('get user like error', (e as Error).message);
    }
  };

  // get like count
  const getLikeCount = async () => {
    // TODO: get like count and dispatch it to the state
    try {
      const countResponse = await getCountByMediaId(item.media_id);
      likeDispatch({type: 'setLikeCount', count: countResponse.count});
    } catch (error) {
      console.log('get user like error', (error as Error).message);
    }
  };

  useEffect(() => {
    getLikes();
    getLikeCount();
  }, [item]);

  const handleLike = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!item || !token) {
        return;
      }
      // If user has liked the media, delete the like. Otherwise, post the like.
      if (likeState.userLike) {
        // delete the like and dispatch the new like count to the state. Dispatching is already done in the getLikes and getLikeCount functions.
        await deleteLike(likeState.userLike.like_id, token);
        // optionally use getLikes() & getLikeCount() here to update all likes from db
        likeDispatch({type: 'like', like: null});
        likeDispatch({type: 'setLikeCount', count: likeState.count - 1});
      } else {
        // post the like and dispatch the new like count to the state. Dispatching is already done in the getLikes and getLikeCount functions.
        await postLike(item.media_id, token);
        getLikes();
        getLikeCount();
      }
    } catch (e) {
      console.log('like error', (e as Error).message);
    }
  };

  return (
    <View>
      <Button
        containerStyle={{borderRadius: 10}}
        onPress={handleLike}
        icon={{
          name: likeState.userLike ? 'thumb-up-off-alt' : 'thumb-up',
          color: 'white',
          size: 20,
        }}
        title={likeState.count.toString()}
      />
    </View>
  );
};

export default Likes;
