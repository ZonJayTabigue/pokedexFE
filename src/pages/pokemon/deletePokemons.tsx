import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid, Input, Button, Flex } from '@chakra-ui/react';
import { getAllPokemons } from '../../utils/api/pokemons/getAllPokemon';
import { PokemonType } from '../../utils/prop_types/PropTypes';
import DeletePokemonCard from './components/deletePokemonCard'; 

const DeletePokemons = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemonCards, setPokemonCards] = useState<PokemonType[]>([]);


  const fetchAllPokemons = useCallback(async () => {
      const response = await getAllPokemons(currentPage, searchQuery);
      const pokemons: PokemonType[] = response.data.pokemons;
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setPokemonCards(pokemons);

   }, [currentPage, searchQuery]);

  useEffect(() => {
    fetchAllPokemons();
  }, [fetchAllPokemons]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleDeletePokemon = () => {
      fetchAllPokemons();
  };

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
      <Box display="flex" justifyContent="center">
        <Grid 
          templateColumns="repeat(3, 1fr)"
          gap={6} 
          maxWidth="1200px"
          width="100%"
        >
          {pokemonCards.map((pokemon) => (
              <DeletePokemonCard 
                key={pokemon._id} 
                pokemon={pokemon} 
                onDelete={handleDeletePokemon} 
              />
          ))}
        </Grid>
      </Box>
      <Flex justifyContent="center" mt={6}>
        <Button colorScheme='red' onClick={handlePreviousPage} isDisabled={currentPage === 1}>
          Previous
        </Button>
        <Box mx={4} display="flex" alignItems="center">
          Page {currentPage} of {totalPages}
        </Box>
        <Button colorScheme='red' onClick={handleNextPage} isDisabled={currentPage === totalPages}>
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default DeletePokemons;
