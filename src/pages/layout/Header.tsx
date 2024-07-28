import React from 'react';
import { Box, Flex, Image, Button, Link, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'gray.900');
//   const color = useColorModeValue('black', 'white');

  return (
   <Box bg={bg} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
      <Box flex="1" />
      <Link as={RouterLink} to="/">
         <Image src="/pokemonLogo.png" alt="Pokedex" height="100px" mt={10} />
      </Link>
      <Flex flex="1" justifyContent="flex-end">
         <Button onClick={toggleColorMode} variant="ghost">
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
         </Button>
      </Flex>
      </Flex>
   </Box>
  );
};

export default Header;
