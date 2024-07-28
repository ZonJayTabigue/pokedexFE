import React, { useState } from 'react';
import { Box, Button, Image, Flex, FormControl, FormLabel, Heading, Input, useColorModeValue, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {registerAPI } from '../../utils/api/Register';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const bg = useColorModeValue('white', 'gray.700');
  const color = useColorModeValue('gray.800', 'white');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] =  useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };
   const handleSubmit = async (event: React.FormEvent) => {
      const res = await registerAPI(username, password);
      if (res.status === 200) {
        navigate('/auth/login');
      } else {
        alert(res.message);  // Handle the error as needed
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
              Register Account
              <Image src="/pokemon.png" alt="Pokedex" maxH="10px" ml={2} />
            </Flex>
          </Heading>

        <form onSubmit={handleSubmit}>
          
          <FormControl id="username" mb={4}>
            <FormLabel>Username</FormLabel>
            <Input type="text" onChange={(e) => setUsername(e.target.value)} required />
          </FormControl>
          
          <FormControl id="password" mb={6}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"}  onChange={(e) => setPassword(e.target.value)} required />
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
          
          <Button type="submit" colorScheme="red" width="full">
            Submit
          </Button>
        
        </form>
      </Box>
    </Flex>
  );
};

export default Register;
