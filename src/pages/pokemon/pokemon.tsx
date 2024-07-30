import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Center, 
  Image, 
  SimpleGrid, 
  Stack, 
  Text, 
  VStack,
  Badge, 
  Heading,
  Progress,
  useColorModeValue
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { getPokemon } from '../../utils/api/pokemons/getPokemon';
import { PokemonType } from '../../utils/prop_types/PropTypes';
import { getColorScheme } from '../../utils/functions/getColorScheme';

const Pokemon = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const bg = useColorModeValue('white', 'gray.700');
  const color = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'transparent');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPokemon(id);

        if (response && response.data) {
          setPokemon(response.data);
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (error) {
        setError('Failed to fetch Pokémon');
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return (
      <Center height="100vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  if (!pokemon) {
    return (
      <Center height="100vh">
        <Text>Loading...</Text>
      </Center>
    );
  }

  return (
    <Center py={6} minHeight="90vh" justifyContent="center">
      <Box
        maxW={'550px'}
        w={'full'}
        bg={bg} color={color} borderColor={borderColor}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Image
          borderRadius="full"
          boxSize="250px"
          src={pokemon.image_url}
          alt={pokemon.name}
          mb={4}
          mx="auto"
        />
        <Heading fontSize={'5xl'} fontFamily={'body'}>
          {pokemon.name.toLocaleUpperCase()}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          Base Experience: {pokemon.base_experience}
        </Text>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          Weight: {pokemon.weight} kg | Height: {pokemon.height} m
        </Text>
        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          {pokemon.types.map((type, index) => (
            <Image
              key={index}
              src={`/type_icons/${type.name.toLowerCase()}.png`}
              alt={type.name}
              height="25px"
              mx="2px"
              mb={1}
            />
          ))}
        </Stack>
        <Text mt={4} fontWeight={600}>
          Abilities:
        </Text>
        <SimpleGrid columns={2} spacing={2} mt={2}>
          {pokemon.abilities.map((ability) => (
            <Badge
              key={ability._id}
              px={2}
              py={1}
              bg={'orange.500'}
              color={'white'}
              fontWeight={'400'}
            >
              {ability.name}
            </Badge>
          ))}
        </SimpleGrid>
        <Text mt={4} fontWeight={600}>
          Stats:
        </Text>
        <VStack spacing={2} mt={2} width="100%">
          {pokemon.stats.map((stat, index) => (
            <Box key={index} width="100%">
              <Text fontWeight={600}>{stat.stat.name.toLocaleUpperCase()} ({stat.value})</Text>
              <Progress
                rounded='md'
                colorScheme={getColorScheme(stat.stat.name)}
                size="md"
                value={stat.value}
                max={255}
              />
            </Box>
          ))}
        </VStack>
        <Button mt={10} width='100%' as={Link} to={`/pokemon/edit/${pokemon._id}`} colorScheme='yellow'>
          Edit Pokémon
        </Button>
      </Box>
    </Center>
  );
};

export default Pokemon;
