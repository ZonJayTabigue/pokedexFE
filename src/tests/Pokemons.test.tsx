/* eslint-disable testing-library/no-unnecessary-act */
// src/tests/Pokemons.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom'; // Make sure this is imported
import Pokemons from '../pages/pokemon/pokemons';
import { getAllPokemons } from '../utils/api/pokemons/getAllPokemon';

jest.mock('../utils/api/pokemons/getAllPokemon', () => ({
  getAllPokemons: jest.fn()
}));

const mockPokemonsResponse = {
  data: {
    pokemons: [
      { _id: '1', name: 'Bulbasaur', types: [{ name: 'Grass' }], image: 'bulbasaur.png' },
      { _id: '2', name: 'Ivysaur', types: [{ name: 'Grass' }], image: 'ivysaur.png' },
    ],
    currentPage: 1,
    totalPages: 2,
  }
};

describe('Pokemons Component', () => {
  beforeEach(() => {
    const mockedGetAllPokemons = getAllPokemons as jest.Mock;
    mockedGetAllPokemons.mockResolvedValue(mockPokemonsResponse);
  });

  test('renders Pokemons component correctly', async () => {
    await act(async () => {
      render(
        <Router>
          <Pokemons />
        </Router>
      );
    });

    expect(screen.getByPlaceholderText('Search Pokémon')).toBeInTheDocument();
    expect(screen.getByText('Create Pokémon')).toBeInTheDocument();
    expect(screen.getByText('Delete Pokémon')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('BULBASAUR')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('IVYSAUR')).toBeInTheDocument();
    });
  });

  test('handles pagination buttons', async () => {
    await act(async () => {
      render(
        <Router>
          <Pokemons />
        </Router>
      );
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Previous/i })).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
    });


    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    });
    await waitFor(() => {
      expect(getAllPokemons).toHaveBeenCalledWith(2, '');
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Previous/i }));
    });
    await waitFor(() => {
      expect(getAllPokemons).toHaveBeenCalledWith(1, '');
    });
  });
});
