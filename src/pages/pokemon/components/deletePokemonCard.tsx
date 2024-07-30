import React from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Progress,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { PokemonType } from '../../../utils/prop_types/PropTypes';
import { getColorScheme } from '../../../utils/functions/getColorScheme';
import { deletePokemon } from '../../../utils/api/pokemons/deletePokemon';

interface Props {
  pokemon: PokemonType;
  onDelete: () => void;
}

const DeletePokemonCard = ({ pokemon, onDelete }: Props) => {
  const bg = useColorModeValue('white', 'gray.700');
  const color = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'transparent');
  const toast = useToast();

  const handleDeletePokemon = async () => {
    try {
      await deletePokemon(pokemon._id);
      toast({
        title: 'Pokémon Deleted.',
        description: 'Your Pokémon has been deleted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onDelete();
    } catch (error) {
      toast({
        title: 'Error deleting Pokémon.',
        description: 'There was an error deleting the Pokémon.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.log('Failed to delete Pokémon:', error);
    }
  }

  return (
    <Card color={color} bg={bg} maxW='sm' border='1px' borderColor={borderColor}>
      <CardBody>
         <Flex direction="column" alignItems="center">
            <Box 
               width="180px" 
               height="180px" 
               display="flex" 
               alignItems="center" 
               justifyContent="center" 
               borderRadius='md'
               overflow="hidden"
               bg="white"
            >
               <Image
               src={pokemon?.image_url}
               alt={pokemon?.name}
               objectFit="cover"
               maxWidth="100%"
               maxHeight="100%"
               />
            </Box>
         </Flex>
         <Stack mt='6' spacing='3'>
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            <Heading size="lg">{(pokemon?.name).toLocaleUpperCase()}</Heading>
            <Flex direction="column" alignItems="center">
              {pokemon.types.map((type, index) => (
                <Image
                  key={index}
                  src={`/type_icons/${type.name.toLowerCase()}.png`}
                  alt={type.name}
                  height="15px"
                  mx="2px"
                  mb={1}
                />
              ))}
            </Flex>
          </Flex>
          <Stack mt='0' spacing='1'>
            {pokemon.stats.map((stat, index) => (
              <Box key={index}>
                <Flex justifyContent="space-between">
                  <Text fontWeight="bold">{stat.stat?.name}</Text>
                  <Text>{stat.value}</Text>
                </Flex>
                <Progress rounded='md' size='xs' value={stat.value} colorScheme={getColorScheme(stat.stat?.name)} />
              </Box>
            ))}
          </Stack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
          <Button width='100%' onClick={handleDeletePokemon} colorScheme='red'>
            Delete Pokémon
          </Button>
      </CardFooter>
    </Card>
  );
}

export default DeletePokemonCard;
