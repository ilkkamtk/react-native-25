import {Button, Card, Input} from '@rneui/base';
import {Controller, useForm} from 'react-hook-form';
import {useUser} from '../hooks/apiHooks';
import {RegisterCredentials} from '../types/LocalTypes';
import {Alert} from 'react-native';

const RegisterForm = ({setDisplayRegister}: {setDisplayRegister: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const {postRegister, getUserNameAvailable, getEmailAvailable} = useUser();
  const initValues: {
    username: string;
    password: string;
    confirmPassword?: string;
    email: string;
  } = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  };

  const doRegister = async (inputs: {
    username: string;
    password: string;
    confirmPassword?: string;
    email: string;
  }) => {
    try {
      delete inputs.confirmPassword;
      const registerResult = await postRegister(inputs as RegisterCredentials);
      console.log('doRegister result', registerResult);
      Alert.alert('User created!');
      setDisplayRegister(false);
    } catch (error) {
      console.error((error as Error).message);
      Alert.alert('Registration failed!', (error as Error).message);
    }
  };

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: initValues,
  });

  return (
    <Card>
      <Card.Title>Registration</Card.Title>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 3, message: 'min 3 chars'},
          maxLength: 32,
          validate: async (value) => {
            try {
              const {available} = await getUserNameAvailable(value);
              //console.log('username available?', available);
              return available ? true : 'username not available';
            } catch (error) {
              console.error((error as Error).message);
              return true;
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.username?.message}
          />
        )}
        name="username"
      />
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          minLength: {value: 5, message: 'min 5 chars'},
          required: {value: true, message: 'is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          validate: (value) => {
            return value === getValues().password ? true : 'password must match!';
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="confirm password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.confirmPassword?.message}
          />
        )}
        name="confirmPassword"
      />
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: {value: true, message: 'is required'},
          pattern: {
            // simple email regex pattern, do better?
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'not a valid email',
          },
          // TODO: add validate function for checking email availibility
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="email address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.email?.message}
          />
        )}
        name="email"
      />
      <Button title="Register" onPress={handleSubmit(doRegister)} />
    </Card>
  );
};

export default RegisterForm;
