import React, { useEffect, useState } from 'react';
import { Grid, Box, Button, Flex, Input, useColorModeValue, HStack } from '@chakra-ui/react';
import PokemonCard from './components/pokemonCard';
import { getAllPokemons } from '../../utils/api/pokemons/getAllPokemon';
import { PokemonType } from '../../utils/prop_types/PropTypes';
import { Link } from 'react-router-dom';

const Pokemons = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemonCards, setPokemonCards] = useState<PokemonType[]>([]);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      const response = await getAllPokemons(currentPage, searchQuery);
      const pokemons: PokemonType[] = response.data.pokemons;
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setPokemonCards(pokemons);
    };
    fetchAllPokemons();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box p={10}>
      <Flex justifyContent="center" mb={6}>
        <Input
          placeholder="Search Pokémon"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          maxW="400px"
        />
      </Flex>
      <HStack spacing={4} justifyContent="center" mb={6}>
        <Button as={Link} to="/pokemon/create" colorScheme="blue">
          Create Pokémon
        </Button>
        <Button as={Link} to="/pokemon/delete" colorScheme="red">
          Delete Pokémon
        </Button>
      </HStack>
      <Box display="flex" justifyContent="center">
        <Grid 
          templateColumns="repeat(3, 1fr)"
          gap={6} 
          maxWidth="1200px"
          width="100%"
        >
          {pokemonCards?.map((pokemon) => (
              <PokemonCard key={pokemon._id} pokemon={pokemon} />
          ))}
        </Grid>
      </Box>
      <Flex justifyContent="center" mt={6}>
        <Button name='Previous' colorScheme={useColorModeValue('red', 'red')} onClick={handlePreviousPage} isDisabled={currentPage === 1}>
          Previous
        </Button>
        <Box mx={4} display="flex" alignItems="center">
          Page {currentPage} of {totalPages}
        </Box>
        <Button name='Next' colorScheme={useColorModeValue('red', 'red')} onClick={handleNextPage} isDisabled={currentPage === totalPages}>
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default Pokemons;
