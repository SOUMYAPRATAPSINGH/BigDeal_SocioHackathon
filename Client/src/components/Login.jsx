import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  VStack,
  Button,
  Spinner,
} from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUser } from '../userContext.jsx';

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [sessionTimeout, setSessionTimeout] = useState(null);
  const { setUserId, setToken } = useUser();

  useEffect(() => {
    return () => {
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
    };
  }, [sessionTimeout]);

  const setSessionTimeoutCallback = () => {
    const sessionTimeoutId = setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setUserId(null);
      setToken(null);
      history.push('/');
    },15*60 * 10000); // 1 hour session timeout

    setSessionTimeout(sessionTimeoutId);
  };

  const showAlert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
    });
  };

  const validateInputs = () => {
    if (!email || !password) {
      showAlert('Error', 'Please fill in all fields.', 'error');
      return false;
    }
    return true;
  };

  const submitHandler = async () => {
    try {
      if (!validateInputs()) {
        return;
      }

      setLoading(true);

      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
      });

      console.log('Login API Response:', response); // Log the entire response for debugging

      if (response.status === 200) {
        const { token, userId } = response.data;
        console.log(response.data)
        // Store the userId and token in the context
        setUserId(userId);
        setToken(token);

        // Store the token and userId in localStorage (if needed)
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        // Continue with your navigation logic
        setSessionTimeoutCallback();
        history.push("/intake-form");
      } else {
        showAlert('Error', 'Invalid email or password', 'error');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      showAlert('Error', 'Invalid email or password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
        loadingText="Logging in..."
      >
        {loading ? <Spinner /> : 'Login'}
      </Button>
    </VStack>
  );
};

export default Login;