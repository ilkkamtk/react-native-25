import {Button, Card, Icon, ListItem, Text} from '@rneui/base';
import {useUserContext} from '../hooks/ContextHooks';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

const Profile = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const {user, handleLogout} = useUserContext();
  return (
    <Card>
      <Card.Title>{user?.username}</Card.Title>
      {/* TODO: add user details */}
      <ListItem>
        <Icon name="email" />
        <Text>{user?.email}</Text>
      </ListItem>
      <ListItem>
        <Icon name="today" />
        <Text>Member since: {user && new Date(user.created_at).toLocaleString('fi-FI')}</Text>
      </ListItem>
      <Button onPress={()=> {navigation.navigate('My Files')}}>My Files</Button>
      <Button onPress={handleLogout}>Logout</Button>
    </Card>
  );
};

export default Profile;
