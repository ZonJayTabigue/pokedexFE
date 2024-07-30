/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import EditPokemon from '../pages/pokemon/editPokemon';
import { getPokemon } from '../utils/api/pokemons/getPokemon';
import { getAllTypes } from '../utils/api/pokemonTypes/getType';
import { getAllAbilities } from '../utils/api/pokemonAbilities/getAbilities';
import { getAllStats } from '../utils/api/pokemonStats/getStats';
import { editPokemon } from '../utils/api/pokemons/editPokemon';

jest.mock('../utils/api/pokemons/getPokemon');
jest.mock('../utils/api/pokemonTypes/getType');
jest.mock('../utils/api/pokemonAbilities/getAbilities');
jest.mock('../utils/api/pokemonStats/getStats');
jest.mock('../utils/api/pokemons/editPokemon');

const mockPokemonResponse = {
  data: {
    _id: '1',
    name: 'bulbasaur',
    base_experience: 64,
    weight: 6.9,
    height: 0.7,
    image_url: 'bulbasaur.png',
    types: [{ _id: '1', name: 'Grass' }, { _id: '2', name: 'Poison' }],
    abilities: [{ _id: '1', name: 'Overgrow' }, { _id: '2', name: 'Chlorophyll' }],
    stats: [
      { stat: { _id: '1', name: 'hp' }, value: 45 },
      { stat: { _id: '2', name: 'attack' }, value: 49 },
    ]
  }
};

const mockTypes = {
  data: [
    { _id: '1', name: 'Grass' },
    { _id: '2', name: 'Poison' }
  ]
};

const mockAbilities = {
  data: [
    { _id: '1', name: 'Overgrow' },
    { _id: '2', name: 'Chlorophyll' }
  ]
};

const mockStats = {
  data: [
    { _id: '1', name: 'hp' },
    { _id: '2', name: 'attack' },
    { _id: '3', name: 'defense' }
  ]
};

describe('EditPokemon Component', () => {
  beforeEach(() => {
    (getPokemon as jest.Mock).mockResolvedValue(mockPokemonResponse);
    (getAllTypes as jest.Mock).mockResolvedValue(mockTypes);
    (getAllAbilities as jest.Mock).mockResolvedValue(mockAbilities);
    (getAllStats as jest.Mock).mockResolvedValue(mockStats);
    (editPokemon as jest.Mock).mockResolvedValue({});
  });

  test('renders Pokémon data correctly', async () => {
    await act(async () => {
      render(
         <ChakraProvider>
            <MemoryRouter initialEntries={['/pokemon/edit/1']}>
               <Routes>
                  <Route path="/pokemon/edit/:id" element={<EditPokemon />} />
               </Routes>
            </MemoryRouter>
         </ChakraProvider>
      );
    });
    

    await waitFor(() => {
      expect(screen.getByLabelText(/Name/i)).toHaveValue('bulbasaur');
      expect(screen.getByLabelText(/Base Experience/i)).toHaveValue(64);
      expect(screen.getByLabelText(/Weight \(kg\)/i)).toHaveValue(6.9);
      expect(screen.getByLabelText(/Height \(m\)/i)).toHaveValue(0.7);
      expect(screen.getByAltText('Selected Type')).toHaveAttribute('src', 'bulbasaur.png');
      expect(screen.getByText('Grass')).toBeInTheDocument();
      expect(screen.getByText('Poison')).toBeInTheDocument();
      expect(screen.getByText('Overgrow')).toBeInTheDocument();
      expect(screen.getByText('Chlorophyll')).toBeInTheDocument();
    });
  });

  test('handles form submission successfully', async () => {
    await act(async () => {
      render(
         <ChakraProvider>
            <MemoryRouter initialEntries={['/pokemon/edit/1']}>
               <Routes>
                  <Route path="/pokemon/edit/:id" element={<EditPokemon />} />
               </Routes>
            </MemoryRouter>
         </ChakraProvider>
      );
    });

    const nameInput = await screen.findByPlaceholderText('Enter Pokemon name');
    expect(nameInput).toBeInTheDocument();

    const baseExpInput = await screen.findByPlaceholderText('Enter Pokemon base experience');
    expect(baseExpInput).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: 'ivysaur' } });
    fireEvent.change(baseExpInput, { target: { value: 70 } });

    fireEvent.click(await screen.findByText(/save/i));

    await waitFor(() => {
      expect(editPokemon).toHaveBeenCalledWith('1', {
        name: 'ivysaur',
        base_experience: 70,
        image_url: 'bulbasaur.png',
        weight: 6.9,
        height: 0.7,
        types: ['1', '2'],
        abilities: ['1', '2'],
        stats: [
          { stat: '1', value: 45 },
          { stat: '2', value: 49 }
        ]
      });
    });
  });

  test('handles error during form submission', async () => {
    (editPokemon as jest.Mock).mockRejectedValueOnce(new Error('Failed to update Pokémon'));

    await act(async () => {
      render(
         <ChakraProvider>
            <MemoryRouter initialEntries={['/pokemon/edit/1']}>
               <Routes>
                  <Route path="/pokemon/edit/:id" element={<EditPokemon />} />
               </Routes>
            </MemoryRouter>
         </ChakraProvider>
      );
    });

    fireEvent.change(await screen.findByLabelText(/Name/i), { target: { value: 'ivysaur' } });
    fireEvent.change(await screen.findByLabelText(/Base Experience/i), { target: { value: 70 } });

    fireEvent.click(await screen.findByText(/Save/i));

    await waitFor(() => {
      expect(screen.getByText('Error updating Pokémon.')).toBeInTheDocument();
    });
  });
});
