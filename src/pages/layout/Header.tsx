import React from 'react';
import { Box, Flex, Image, Button, Link, useColorMode, useColorModeValue, useToast } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { logoutAPI } from '../../utils/api/Logout';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'gray.900');
  const navigate = useNavigate();
  const toast = useToast();
  
  const handleLogout = async () => {
   try {
     await logoutAPI();

     toast({
       title: 'Logged out successfully.',
       status: 'success',
       duration: 5000,
       isClosable: true,
       position: 'top',
     });

     navigate('/auth/login');
   } catch (error) {
     toast({
       title: 'An error occurred.',
       status: 'error',
       duration: 5000,
       isClosable: true,
       position: 'top',
     });
   }
 };

  return (
    <Box bg={bg} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box flex="1" />
        <Link as={RouterLink} to="/">
          <Image src="/pokemonLogo.png" alt="Pokedex" height="100px" mt={8} />
        </Link>
        <Flex flex="1" justifyContent="flex-end" alignItems="center">
          <Button as={RouterLink} to="/" variant="ghost" mr={4}>
            Home
          </Button>
          <Button onClick={handleLogout} variant="ghost" mr={4}>
            Logout
          </Button>
          <Button onClick={toggleColorMode} variant="ghost">
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
