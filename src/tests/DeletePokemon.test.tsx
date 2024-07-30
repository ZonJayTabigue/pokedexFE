/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import DeletePokemonCard from '../pages/pokemon/components/deletePokemonCard';
import { deletePokemon } from '../utils/api/pokemons/deletePokemon';
import { PokemonType } from '../utils/prop_types/PropTypes';

jest.mock('../utils/api/pokemons/deletePokemon');

const mockPokemon: PokemonType = {
   _id: 1,
   name: 'PIKACHU',
   image_url: 'http://example.com/pikachu.png',
   types: [{
      name: 'Electric',
      _id: '',
      ref: 'Type'
   }],
   stats: [{
      stat: {
         name: 'HP',
         stat: undefined,
         _id: '',
         ref: 'Stat'
      }, value: 55,
      _id: '',
      name: undefined
   }],
   height: 0,
   weight: 0,
   base_experience: 0,
   abilities: []
};

describe('DeletePokemonCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Pokémon details correctly', () => {
    render(
      <ChakraProvider>
        <DeletePokemonCard
          pokemon={mockPokemon}
          onDelete={() => {}}
        />
      </ChakraProvider>
    );

    expect(screen.getByText('PIKACHU')).toBeInTheDocument();
    expect(screen.getByAltText('PIKACHU')).toBeInTheDocument();
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('55')).toBeInTheDocument();
  });

  test('handles delete button click', async () => {
    (deletePokemon as jest.Mock).mockResolvedValue({});

    const handleDelete = jest.fn();

    render(
      <ChakraProvider>
        <DeletePokemonCard
          pokemon={mockPokemon}
          onDelete={handleDelete}
        />
      </ChakraProvider>
    );

    fireEvent.click(screen.getByText('Delete Pokémon'));

    await waitFor(() => {
      expect(deletePokemon).toHaveBeenCalledWith(mockPokemon._id);
      expect(handleDelete).toHaveBeenCalled();
    });
  });

  test('handles delete failure', async () => {
    (deletePokemon as jest.Mock).mockRejectedValue(new Error('Delete failed'));

    const handleDelete = jest.fn();

    render(
      <ChakraProvider>
        <DeletePokemonCard
          pokemon={mockPokemon}
          onDelete={handleDelete}
        />
      </ChakraProvider>
    );

    fireEvent.click(screen.getByText('Delete Pokémon'));

    await waitFor(() => {
      expect(deletePokemon).toHaveBeenCalledWith(mockPokemon._id);
      expect(handleDelete).not.toHaveBeenCalled();
      expect(screen.getByText('Error deleting Pokémon.')).toBeInTheDocument();
    });
  });
});
