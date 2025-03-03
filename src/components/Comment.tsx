import {Comment as CommentType} from 'hybrid-types/DBTypes';
import {ListItem, Avatar} from '@rneui/base';

type CommentProps = {
  item: Partial<
    CommentType & {
      username: string;
    }
  >;
};

const Comment = ({item}: CommentProps) => {
  return (
    <ListItem bottomDivider>
      <Avatar
        rounded
        title={item.username?.charAt(0).toUpperCase()}
        containerStyle={{backgroundColor: '#3d4db7'}}
      />
      <ListItem.Content>
        <ListItem.Title>{item.username}</ListItem.Title>
        <ListItem.Subtitle>{item.comment_text}</ListItem.Subtitle>
        <ListItem.Subtitle style={{fontSize: 12, color: '#888'}}>
          {new Date(item.created_at || '').toLocaleString('fi-FI')}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default Comment;
