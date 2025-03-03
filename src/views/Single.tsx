import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Alert, Image, ScrollView, StyleSheet, Text} from 'react-native';
import {Button, Card, Icon, ListItem} from '@rneui/base';
import VideoPlayer from '../components/VideoPlayer';
import {useMedia} from '../hooks/apiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigatorType} from '../types/LocalTypes';
import {Link, useNavigation} from '@react-navigation/native';
import {useUpdateContext, useUserContext} from '../hooks/ContextHooks';
import {RouteProp} from '@react-navigation/native';

type SingleProps = {
  route: RouteProp<NavigatorType, 'Single'>;
};

const Single = ({route}: SingleProps) => {
  const item: MediaItemWithOwner = route.params.item;
  const {deleteMedia} = useMedia();
  const {triggerUpdate} = useUpdateContext();
  const navigation = useNavigation<NativeStackNavigationProp<NavigatorType>>();
  const {user} = useUserContext();

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return;
      }
      Alert.alert('Delete', 'Are you sure?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const result = await deleteMedia(item.media_id, token);
              console.log(result);
              triggerUpdate();
              navigation.goBack();
            } catch (e) {
              console.log((e as Error).message);
              Alert.alert(
                'Delete failed',
                (e as Error).message || 'Unknown error',
              );
            }
          },
        },
      ]);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <ScrollView>
      <Card>
        <Card.Title>{item.title}</Card.Title>

        {item.media_type.includes('image') ? (
          <Link screen={'Modal'} params={{item}}>
            <Image style={styles.image} src={item.filename} />
          </Link>
        ) : (
          <VideoPlayer videoFile={item.filename} style={styles.image} />
        )}
        <ListItem>
          <Icon name="today" />
          <Text>{new Date(item.created_at).toLocaleString('fi-FI')}</Text>
        </ListItem>
        {/* <Likes item={item} /> */}
        <ListItem>
          <Text>{item.description}</Text>
        </ListItem>
        <ListItem>
          <Icon name="inventory" />
          <Text>{item.media_type}</Text>
        </ListItem>
        <ListItem>
          <Icon name="person" />
          <Text>{item.username}</Text>
        </ListItem>
        <ListItem>
          <Icon name="image" />
          <Text>{Math.round(item.filesize / 1024)} kB</Text>
        </ListItem>
        {/* <Comments item={item} /> */}
        {user && user.user_id === item.user_id && (
          <Button onPress={handleDelete}>Delete</Button>
        )}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 400,
    width: '100%',
  },
});

export default Single;
