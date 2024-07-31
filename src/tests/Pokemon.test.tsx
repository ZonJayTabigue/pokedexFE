/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Pokemon from '../pages/pokemon/pokemon';
import { getPokemon } from '../utils/api/pokemons/getPokemon';

// Mock the API call
jest.mock('../utils/api/pokemons/getPokemon', () => ({
  getPokemon: jest.fn()
}));

const mockPokemonResponse = {
  data: {
    _id: '1',
    name: 'Bulbasaur',
    base_experience: 64,
    weight: 6.9,
    height: 0.7,
    image_url: 'bulbasaur.png',
    types: [{ name: 'Grass' }, { name: 'Poison' }],
    abilities: [{ _id: '1', name: 'Overgrow' }, { _id: '2', name: 'Chlorophyll' }],
    stats: [
      { stat: { name: 'hp' }, value: 45 },
      { stat: { name: 'attack' }, value: 49 },
      { stat: { name: 'defense' }, value: 49 },
      { stat: { name: 'speed' }, value: 45 },
    ]
  }
};

describe('Pokemon Component', () => {
  beforeEach(() => {
    (getPokemon as jest.Mock).mockResolvedValue(mockPokemonResponse);
  });

  test('renders Pokemon details correctly', async () => {
    // Wrap rendering in act to handle state updates
    await act(async () => {
      render(
        <Router>
          <Pokemon />
        </Router>
      );
    });

     // Separate assertions into different waitFor calls
     await waitFor(() => {
      expect(screen.getByText('BULBASAUR')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Base Experience: 64')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Weight: 6.9 kg | Height: 0.7 m')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Overgrow')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Chlorophyll')).toBeInTheDocument();
    });

    // Check for types
    await waitFor(() => {
      expect(screen.getAllByAltText('Grass').length).toBe(1);
    });

    await waitFor(() => {
      expect(screen.getAllByAltText('Poison').length).toBe(1);
    });

    // Check for stats
    await waitFor(() => {
      expect(screen.getByText('HP (45)')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('ATTACK (49)')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('DEFENSE (49)')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('SPEED (45)')).toBeInTheDocument();
    });
  });

  test('handles errors during data fetching', async () => {
    (getPokemon as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch Pokémon'));

    await act(async () => {
      render(
        <Router>
          <Pokemon />
        </Router>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch Pokémon')).toBeInTheDocument();
    });
  });
});
