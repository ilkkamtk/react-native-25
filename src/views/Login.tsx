import {useEffect, useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button} from '@rneui/base';
import {ScrollView} from 'react-native';
import {useUserContext} from '../hooks/ContextHooks';

const Login = () => {
  const [displayRegister, setDisplayRegister] = useState(false);
  const {handleAutoLogin} = useUserContext();

  const toggleRegister = () => {
    setDisplayRegister(!displayRegister);
  };

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <ScrollView>
      {displayRegister ? (
        <RegisterForm setDisplayRegister={setDisplayRegister} />
      ) : (
        <LoginForm />
      )}
      <Button onPress={toggleRegister}>
        or {displayRegister ? 'login' : 'register'}?
      </Button>
    </ScrollView>
  );
};

export default Login;
