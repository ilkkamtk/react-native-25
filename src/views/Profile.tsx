import {Button, Card} from '@rneui/base';
import {useUserContext} from '../hooks/ContextHooks';

const Profile = () => {
  const {user, handleLogout} = useUserContext();
  return (
    <Card>
      <Card.Title>{user?.username}</Card.Title>
      {/* TODO: add user details */}
      <Button onPress={handleLogout}>Logout</Button>
    </Card>
  );
};

export default Profile;
