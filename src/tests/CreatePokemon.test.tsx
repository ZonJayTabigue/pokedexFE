/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import CreatePokemon from '../pages/pokemon/createPokemon';
import { getAllTypes } from '../utils/api/pokemonTypes/getType';
import { getAllAbilities } from '../utils/api/pokemonAbilities/getAbilities';
import { getAllStats } from '../utils/api/pokemonStats/getStats';
import { createPokemon } from '../utils/api/pokemons/createPokemon';

jest.mock('../utils/api/pokemonTypes/getType');
jest.mock('../utils/api/pokemonAbilities/getAbilities');
jest.mock('../utils/api/pokemonStats/getStats');
jest.mock('../utils/api/pokemons/createPokemon');


const mockTypes = {
  data: [
    { _id: '1', name: 'grass' },
    { _id: '2', name: 'fire' }
  ]
};

const mockAbilities = {
  data: [
    { _id: '1', name: 'Overgrow' },
    { _id: '2', name: 'Blaze' }
  ]
};

const mockStats = {
  data: [
    { _id: '1', name: 'hp' },
    { _id: '2', name: 'attack' },
    { _id: '3', name: 'special-attack' },
    { _id: '4', name: 'defense' },
    { _id: '5', name: 'special-defense' },
    { _id: '6', name: 'speed' }
  ]
};

beforeEach(() => {
  (getAllTypes as jest.Mock).mockResolvedValue(mockTypes);
  (getAllAbilities as jest.Mock).mockResolvedValue(mockAbilities);
  (getAllStats as jest.Mock).mockResolvedValue(mockStats);
  (createPokemon as jest.Mock).mockResolvedValue({
    success: true,
    message: 'Pokémon created successfully',
    status: 200
  });
});

describe('CreatePokemon Component', () => {

  test('renders and submits form successfully', async () => {
    await act(async () => {
      render(
        <ChakraProvider>
          <MemoryRouter initialEntries={['/pokemon/create']}>
            <Routes>
              <Route path="/pokemon/create" element={<CreatePokemon />} />
            </Routes>
          </MemoryRouter>
        </ChakraProvider>
      );
    });

    expect(screen.getByText('Create New Pokémon')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/Enter Pokémon name/i), { target: { value: 'Ivysaur' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter Pokémon base experience/i), { target: { value: '64' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter Pokémon image URL/i), { target: { value: 'ivysaur.png' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter Pokémon weight/i), { target: { value: '10' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter Pokémon height/i), { target: { value: '1.2' } });

    fireEvent.click(screen.getByText(/grass/i));
    fireEvent.click(screen.getByText(/grass/i));

    fireEvent.click(screen.getByText(/Select Abilities/i));
    fireEvent.click(screen.getByText(/Overgrow/i));

    fireEvent.change(screen.getByPlaceholderText(/Enter hp value/i), { target: { value: 45 } });
    fireEvent.change(screen.getByPlaceholderText(/Enter attack value/i), { target: { value: 49 } });
    fireEvent.change(screen.getByPlaceholderText(/Enter special attack value/i), { target: { value: 45 } });
    fireEvent.change(screen.getByPlaceholderText(/Enter defense value/i), { target: { value: 49 } });
    fireEvent.change(screen.getByPlaceholderText(/Enter special defense value/i), { target: { value: 45 } });
    fireEvent.change(screen.getByPlaceholderText(/Enter speed value/i), { target: { value: 49 } });

    fireEvent.click(screen.getByText(/Create Pokémon/i));

    await waitFor(() => {
      expect(createPokemon).toHaveBeenCalledWith({
        name: 'Ivysaur',
        base_experience: 64,
        image_url: 'ivysaur.png',
        weight: 10,
        height: 1.2,
        types: ['1'],
        abilities: ['1'],
        stats: [
          { stat: '1', value: 45 },
          { stat: '2', value: 49 },
          { stat: '3', value: 45 },
          { stat: '4', value: 49 },
          { stat: '5', value: 45 },
          { stat: '6', value: 49 }
        ]
      });
    });

    expect(screen.getByText(/Pokémon created./i)).toBeInTheDocument();
  });
});
