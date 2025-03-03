import {RouteProp, useNavigation} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {NavigatorType} from '../types/LocalTypes';
import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import ImageView from 'react-native-image-viewing';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type ModalProps = {
  route: RouteProp<NavigatorType, 'Modal'>;
};

const Modal = ({route}: ModalProps) => {
  const item: MediaItemWithOwner = route.params.item;
  console.log(item.filename);
  const navigation = useNavigation<NativeStackNavigationProp<NavigatorType>>();

  return (
    <View style={styles.container}>
      <ImageView
        images={[{uri: item.filename}]}
        imageIndex={0}
        visible={true}
        onRequestClose={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
  },
});

export default Modal;
