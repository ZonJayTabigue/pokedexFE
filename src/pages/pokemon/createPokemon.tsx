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
  HStack, // Import HStack for horizontal layout
} from '@chakra-ui/react';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';

import { TypeReference, AbilityReference, StatReference } from '../../utils/prop_types/PropTypes';
import { getAllTypes } from '../../utils/api/pokemonTypes/getType';
import { getAllAbilities } from '../../utils/api/pokemonAbilities/getAbilities';
import { getAllStats } from '../../utils/api/pokemonStats/getStats';
import { createPokemon } from '../../utils/api/pokemons/createPokemon';

const CreatePokemon = () => {
  const [name, setName] = useState('');
  const [baseExperience, setBaseExperience] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [weight, setWeight] = useState(''); // New state for weight
  const [height, setHeight] = useState(''); // New state for height
  const [type, setType] = useState<TypeReference | null>(null);
  const [stats, setStats] = useState<{ stat: string, value: number }[]>([
    { stat: 'hp', value: 0 },
    { stat: 'attack', value: 0 },
    { stat: 'special-attack', value: 0},
    { stat: 'defense', value: 0 },
    { stat: 'special-defense', value: 0 },
    { stat: 'speed', value: 0 }
  ]);
  const [selectedAbilities, setSelectedAbilities] = useState<AbilityReference[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeSelection, setTypeSelection] = useState<TypeReference[]>([]);
  const [abilitySelection, setAbilitySelection] = useState<AbilityReference[]>([]);
  const [statsSelection, setStatSelection] = useState<StatReference[]>([]);
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
        const [typeResponse, abilityResponse, statResponse] = await Promise.all([
          getAllTypes(),
          getAllAbilities(),
          getAllStats()
        ]);

        const types: TypeReference[] = typeResponse.data;
        const abilities: AbilityReference[] = abilityResponse.data;
        const stats: StatReference[] = statResponse.data;

        setTypeSelection(types);
        setAbilitySelection(abilities);
        setStatSelection(stats);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  const handleTypeSelect = (type: TypeReference) => {
    setType(type);
  };

  const handleAbilityToggle = (ability: AbilityReference) => {
    setSelectedAbilities(prev => 
      prev.includes(ability) 
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
      weight: parseFloat(weight) || 0, // Add weight to payload
      height: parseFloat(height) || 0, // Add height to payload
      types: type ? [type._id] : [], // Use type._id if a type is selected
      abilities: selectedAbilities.map(a => a._id), // Map to ability IDs
      stats: stats.map(stat => ({
        stat: statsSelection.find(s => s.name.toLowerCase() === stat.stat)?._id || '',
        value: stat.value
      }))
    };

    try {
      await createPokemon(payload);
      toast({
        title: 'Pokémon created.',
        description: 'Your Pokémon has been created successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error creating Pokémon.',
        description: 'There was an error creating the Pokémon.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Failed to create Pokémon:', error);
    }
  };

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const buttonColor = useColorModeValue('blue', 'orange');

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
        <Text fontSize="2xl" mb={6} textAlign="center">Create New Pokémon</Text>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Pokémon name"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Base Experience</FormLabel>
              <Input
                type="number"
                value={baseExperience}
                onChange={(e) => setBaseExperience(e.target.value)}
                placeholder="Enter Pokémon base experience"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Image URL</FormLabel>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter Pokémon image URL"
              />
            </FormControl>
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
            <HStack spacing={4}>
            <FormControl>
              <FormLabel>Type</FormLabel>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  <Image src={`/type_icons/${type?.name.toLowerCase() || 'grass'}.png`} alt="Selected Type" height="24px" />
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
                      bg={selectedAbilities.includes(ability) ? 'blue.100' : 'transparent'}
                    >
                      {ability.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </FormControl>
            </HStack>
            <FormControl>
              <FormLabel>Stats</FormLabel>
              <Stack spacing={3}>
                {statsSelection.map((stat) => (
                  <FormControl key={stat._id}>
                    <FormLabel>{stat.name}</FormLabel>
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
                      placeholder={`Enter ${stat.name.replace(/-/g, ' ')} value`}
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
              Create Pokémon
            </Button>
          </Stack>
        </form>
      </Box>
    </Center>
  );
};

export default CreatePokemon;
