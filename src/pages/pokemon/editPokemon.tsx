import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  Center,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  InputLeftElement,
  Progress,
  HStack,
} from '@chakra-ui/react';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { TypeReference, AbilityReference, StatReference, PokemonType } from '../../utils/prop_types/PropTypes';
import { getAllTypes } from '../../utils/api/pokemonTypes/getType';
import { getAllAbilities } from '../../utils/api/pokemonAbilities/getAbilities';
import { getAllStats } from '../../utils/api/pokemonStats/getStats';
import { getPokemon } from '../../utils/api/pokemons/getPokemon';
import { editPokemon } from '../../utils/api/pokemons/editPokemon';

const EditPokemon = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [baseExperience, setBaseExperience] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<TypeReference[]>([]);
  const [stats, setStats] = useState<{ stat: string, value: number }[]>([
    { stat: 'hp', value: 0 },
    { stat: 'attack', value: 0 },
    { stat: 'special-attack', value: 0},
    { stat: 'defense', value: 0 },
    { stat: 'special-defense', value: 0 },
    { stat: 'speed', value: 0 }
  ]);
  const [selectedAbilities, setSelectedAbilities] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeSelection, setTypeSelection] = useState<any[]>([]);
  const [abilitySelection, setAbilitySelection] = useState<any[]>([]);
  const [statsSelection, setStatSelection] = useState<any[]>([]);
  const [pokemonData, setPokemonData]  = useState<PokemonType | null>(null);
  const toast = useToast();

  const getColorScheme = (statName: string) => {
    switch (statName.toLowerCase()) {
      case 'hp':
        return 'green';
      case 'attack':
        return 'red';
      case 'special attack':
        return 'purple';
      case 'defense':
        return 'blue';
      case 'special defense':
        return 'yellow';
      case 'speed':
        return 'orange';
      default:
        return 'gray';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pokemonResponse, typeResponse, abilityResponse, statResponse] = await Promise.all([
          getPokemon(id),
          getAllTypes(),
          getAllAbilities(),
          getAllStats()
        ]);

        const pokemon: PokemonType = pokemonResponse.data;
        const types: TypeReference[] = typeResponse.data;
        const abilities: AbilityReference[] = abilityResponse.data;
        const stats: StatReference[] = statResponse.data;

        setPokemonData(pokemon);
        setTypeSelection(types);
        setAbilitySelection(abilities);
        setStatSelection(stats);
      } catch (error) {
        console.log('Failed to fetch data', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (pokemonData) {
      setName(pokemonData.name);
      setBaseExperience(pokemonData.base_experience.toString());
      setImageUrl(pokemonData.image_url);
      setWeight(pokemonData.weight.toString());
      setHeight(pokemonData.height.toString());

      const matchedTypes = typeSelection.filter(t => pokemonData.types.some(pokemonType => pokemonType._id === t._id));
      setSelectedTypes(matchedTypes);
  
      const pokemonAbilityIds = pokemonData.abilities.map(a => a._id);
      const matchedAbilities = abilitySelection.filter(a => pokemonAbilityIds.includes(a._id));
      setSelectedAbilities(matchedAbilities);
  
      const mappedStats = pokemonData.stats.map(s => {
        const statReference = statsSelection.find(stat => stat._id === s.stat._id);
        return {
          stat: statReference ? statReference.name.toLowerCase() : '',
          value: s.value
        };
      });
      setStats(mappedStats);
    }
  }, [pokemonData, typeSelection, abilitySelection, statsSelection]);
  

  const handleTypeSelect = (type: TypeReference) => {
    setSelectedTypes(prev => 
      prev.some(t => t._id === type._id)
        ? prev.filter(t => t._id !== type._id)
        : [...prev, type]
    );
  };

  const handleAbilityToggle = (ability: AbilityReference) => {
    setSelectedAbilities(prev => 
      prev.some(a => a._id === ability._id)
        ? prev.filter(a => a._id !== ability._id)
        : [...prev, ability]
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredAbilities = abilitySelection.filter(ability =>
    ability.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const payload = {
      name,
      base_experience: parseFloat(baseExperience) || 0,
      image_url: imageUrl,
      weight: parseFloat(weight) || 0,
      height: parseFloat(height) || 0,
      types: selectedTypes.map(t => t._id),
      abilities: selectedAbilities.map(a => a._id),
      stats: stats.map(stat => ({
        stat: statsSelection.find(s => s.name.toLowerCase() === stat.stat)?._id || '',
        value: stat.value
      }))
    };

    try {
      await editPokemon(id, payload);
      toast({
        title: 'Pokémon updated.',
        description: 'Your Pokémon has been updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating Pokémon.',
        description: 'There was an error updating the Pokémon.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const buttonColor = useColorModeValue('red', 'orange');

  return (
    <Center height="100vh">
      <Box
        p={6}
        bg={bgColor}
        borderRadius="md"
        boxShadow="md"
        maxW={{ base: '90%', sm: '80%', md: '70%', lg: '60%', xl: '50%' }}
        width="100%"
        mx="auto"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <Text fontSize="2xl" mb={6} textAlign="center">Edit Pokémon</Text>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Pokemon name"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Base Experience</FormLabel>
              <Input
                type="number"
                value={baseExperience}
                onChange={(e) => setBaseExperience(e.target.value)}
                placeholder="Enter Pokemon base experience"
              />
            </FormControl>
            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Enter Pokémon image URL"
                />
              </FormControl>
              <Image src={imageUrl} alt="Selected Type" height="100px" />
            </HStack>
            
            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Weight (kg)</FormLabel>
                <Input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter Pokémon weight"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Height (m)</FormLabel>
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter Pokémon height"
                />
              </FormControl>
            </HStack>
            <FormControl>
              <FormLabel>Types</FormLabel>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  <HStack spacing={2}>
                    {selectedTypes.length > 0 
                      ? selectedTypes.map(type => (
                        <Image 
                          key={type._id} 
                          src={`/type_icons/${type.name.toLowerCase()}.png`} 
                          alt={type.name} 
                          height="24px" 
                        />
                      ))
                      : "Select Types"}
                  </HStack>
                </MenuButton>
                <MenuList
                  maxH="200px"
                  overflowY="auto"
                >
                  {typeSelection.map((type) => (
                    <MenuItem
                      key={type._id}
                      onClick={() => handleTypeSelect(type)}
                      _hover={{ bg: 'gray.100' }}
                      bg={selectedTypes.some(t => t._id === type._id) ? 'blue.100' : 'transparent'}
                    >
                      <Image src={`/type_icons/${type.name.toLowerCase()}.png`} alt={type.name} height="40px" />
                      {type.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </FormControl>
            <FormControl>
              <FormLabel>Abilities</FormLabel>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {selectedAbilities.length > 0 
                    ? selectedAbilities.map(a => a.name).join(', ')
                    : "Select Abilities"}
                </MenuButton>
                <MenuList
                  maxH="200px"
                  overflowY="auto"
                >
                  <InputGroup mb={2}>
                    <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
                    <Input
                      placeholder="Search abilities"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </InputGroup>
                  {filteredAbilities.map((ability) => (
                    <MenuItem
                      key={ability._id}
                      onClick={() => handleAbilityToggle(ability)}
                      _hover={{ bg: 'gray.100' }}
                      bg={selectedAbilities.some(a => a._id === ability._id) ? 'blue.100' : 'transparent'}
                    >
                      {ability.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </FormControl>
            <FormControl>
              <FormLabel>Stats</FormLabel>
              <Stack spacing={3}>
                {statsSelection.map((stat) => (
                  <FormControl key={stat._id}>
                    <FormLabel>{(stat.name).toUpperCase()}</FormLabel>
                    <Input
                      type="number"
                      size="sm"
                      value={stats.find(s => s.stat === stat.name.toLowerCase())?.value || ''}
                      onChange={(e) => {
                        const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                        setStats(stats.map(s =>
                          s.stat === stat.name.toLowerCase() ? { ...s, value } : s
                        ));
                      }}
                      placeholder={`Enter ${stat.name} value`}
                    />
                    <Progress
                      size='xs'
                      value={stats.find(s => s.stat === stat.name.toLowerCase())?.value || 0}
                      colorScheme={getColorScheme(stat.name)}
                    />
                  </FormControl>
                ))}
              </Stack>
            </FormControl>
            <Button type="submit" colorScheme={buttonColor} width="full">
              Save
            </Button>
          </Stack>
        </form>
      </Box>
    </Center>
  );
};

export default EditPokemon;
