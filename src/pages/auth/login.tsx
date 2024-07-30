import React, { useState } from 'react';
import { Box,
         Button, 
         Text, 
         Image, 
         Flex, 
         FormControl, 
         FormLabel, 
         Heading, 
         Input, 
         useColorModeValue, 
         InputGroup, 
         InputRightElement, 
         IconButton,
         Link, 
         useToast} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { loginAPI } from '../../utils/api/Login';

const Login = () => {
  const bg = useColorModeValue('white', 'gray.700');
  const color = useColorModeValue('gray.800', 'white');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] =  useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handlePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };
   
  async function handleSubmit (event: React.FormEvent) {
      const res = await loginAPI(username, password);
      if (res.status === 200) {
         navigate('/');
      } else {
        toast({
          title: res.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
      }

  };

  return (
    <Flex minHeight="100vh" align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Box
        maxW="md"
        w="full"
        bg={bg}
        boxShadow="lg"
        rounded="lg"
        p={6}
      >
        <Heading as="h2" size="lg" textAlign="center" mb={6} color={color}>
            <Flex align="center" justify="center">
              <Image src="/pokemon.png" alt="Pokedex" maxH="10px" mr={2} />
              Login
              <Image src="/pokemon.png" alt="Pokedex" maxH="10px" ml={2} />
            </Flex>
          </Heading>

        {/* <form onSubmit={handleSubmit}> */}
          
          <FormControl id="username" mb={4}>
            <FormLabel>Username</FormLabel>
            <Input type="text" required  onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          
          <FormControl id="password" mb={6}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} required onChange={(e) => setPassword(e.target.value)} />
                <InputRightElement>
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={handlePasswordVisibility}
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          
          <Button onClick={handleSubmit} type="submit" colorScheme="red" width="full">
            Login
          </Button>

          <Flex justifyContent="center">
            <Text color={color} mr={2}>Don't have an account?</Text>
            <Link as={RouterLink} to="/auth/register" color="blue.500">Register</Link>
            </Flex>
        {/* </form> */}
      </Box>
    </Flex>
  );
};

export default Login;
