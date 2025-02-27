import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button} from '@rneui/base';
import {ScrollView} from 'react-native';

const Login = () => {
  const [displayRegister, setDisplayRegister] = useState(false);
  
  const toggleRegister = () => {
    setDisplayRegister(!displayRegister);
  };

  return (
    <ScrollView>
      {displayRegister ? <RegisterForm setDisplayRegister={setDisplayRegister} /> : <LoginForm />}
        <Button
          onPress={toggleRegister}
        >
          or {displayRegister ? 'login' : 'register'}?
        </Button>
    </ScrollView>
  );
};

export default Login;
