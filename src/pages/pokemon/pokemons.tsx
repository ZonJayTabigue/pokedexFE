import React from 'react';
import { Grid, Box } from '@chakra-ui/react';
import PokemonCard from './components/pokemonCard';

const Pokemon = () => {
  return (
    <Box p={10} display="flex" justifyContent="center">
      <Grid 
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))" 
        gap={6} 
        maxWidth="1200px"
        width="100%"
      >
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />

        {/* Add more PokemonCard components as needed */}
      </Grid>
    </Box>
  );
};

export default Pokemon;
