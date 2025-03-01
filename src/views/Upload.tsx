import {Controller, useForm} from 'react-hook-form';
import {Button, Card, Image, Input} from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import {useState} from 'react';
import {StyleSheet, ScrollView, Alert} from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFile, useMedia} from '../hooks/apiHooks';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigatorType} from '../types/LocalTypes';
import {useUpdateContext} from '../hooks/ContextHooks';

const initValues = {title: '', description: ''};

const Upload = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<NavigatorType>>();
  const {postExpoFile} = useFile();
  const {postMedia} = useMedia();
  const {triggerUpdate} = useUpdateContext();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    reset,
  } = useForm({
    defaultValues: initValues,
    mode: 'onChange', // Validate on change and blur
  });

  // Reset function to clear form and image state
  const resetForm = useCallback(() => {
    setImage(null);
    reset(initValues);
    setLoading(false);
  }, [reset]);

  // Reset when navigating away from this tab
  useFocusEffect(
    useCallback(() => {
      // No action needed when coming into focus
      return () => {
        // Reset when leaving the tab
        resetForm();
      };
    }, [resetForm]),
  );

  const doUpload = async (inputs: {title: string; description: string}) => {
    setLoading(true);
    // TODO: if image is not selected, Alert error message and stop running this function
    if (!image) {
      Alert.alert('Error', 'Please select an image or video');
      return;
    }
    // TODO: read token
    const token = await AsyncStorage.getItem('token');
    // TODO: call postExpoFile() with image uri and token
    if (!image.assets || token === null) {
      Alert.alert('Error', 'No token or image selected');
      return;
    }
    const fileResponse = await postExpoFile(image.assets[0].uri, token);
    // TODO: get response and call postMedia() with the response data included
    const mediaResponse = await postMedia(fileResponse, inputs, token);
    console.log(mediaResponse);
    // Use the new triggerUpdate function
    triggerUpdate();
    // TODO: reset the form and navigate to Home tab
    setLoading(false);
    resetForm();
    navigation.navigate('All Media');
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      quality: 0.4,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result);
    }
  };

  return (
    <ScrollView>
      <Card>
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'is required'},
            minLength: {value: 3, message: 'min 3 chars'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Title"
              onBlur={() => {
                onBlur();
              }}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              errorMessage={errors.title?.message}
            />
          )}
          name="title"
        />

        <Controller
          control={control}
          rules={{
            required: false,
            minLength: {
              value: 5,
              message: 'min 5 chars',
            },
            maxLength: 100,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Description"
              onBlur={() => {
                onBlur();
              }}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.description?.message}
            />
          )}
          name="description"
        />
        {image?.assets && image.assets[0].mimeType?.includes('video') ? (
          <VideoPlayer videoFile={image.assets[0].uri} style={styles.image} />
        ) : (
          <Image
            source={{
              uri:
                (image?.assets && image.assets[0].uri) ||
                'https://placehold.co/500x200@2x/grey/white/png?text=Choose+File',
            }}
            style={styles.image}
            onPress={pickImage}
          />
        )}
        <Button
          title="Upload"
          onPress={handleSubmit(doUpload)}
          loading={loading}
          disabled={!isValid || !image}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {height: 200},
});

export default Upload;
