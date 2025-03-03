import {View} from 'react-native';
import {useComment} from '../hooks/apiHooks';
import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import Comment from './Comment';
import {useEffect} from 'react';
import CommentForm from './CommentForm';
import {useUserContext} from '../hooks/ContextHooks';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ListItem} from '@rneui/base';
import {useCommentStore} from '../store';

type CommentsProps = {
  item: MediaItemWithOwner;
};

const Comments = ({item}: CommentsProps) => {
  const {comments, setComments} = useCommentStore();
  const {getCommentsByMediaId, postComment} = useComment();
  const {user} = useUserContext();

  const fetchComments = async () => {
    try {
      const data = await getCommentsByMediaId(item.media_id);
      if (data) {
        setComments(data);
      }
    } catch (error) {
      console.log('Error fetching comments:', error);
      setComments([]);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentSubmit = async (data: {comment: string}) => {
    if (!user) {
      Alert.alert('Please log in to comment');
      return;
    }

    try {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Authentication error', 'Please log in again');
        return;
      }

      await postComment(data.comment, item.media_id, token);
      // Refresh comments after posting
      fetchComments();
    } catch (error) {
      console.error('Error posting comment:', error);
      Alert.alert('Error posting comment');
    }
  };

  return (
    <View style={{width: '100%'}}>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.comment_id} item={comment} />
        ))
      ) : (
        <ListItem>
          <ListItem.Content>
            <ListItem.Subtitle style={{fontStyle: 'italic', color: '#666'}}>
              No comments yet
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      )}

      {user && <CommentForm onSubmit={handleCommentSubmit} />}
    </View>
  );
};

export default Comments;
