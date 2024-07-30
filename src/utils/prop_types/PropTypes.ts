export interface User {
   id: string,
   username: string,
   password: string
}

export interface PokemonType {
   _id: number;
   name: string;
   height: number;
   weight: number;
   base_experience: number;
   image_url: string;
   types: TypeReference[];
   abilities: AbilityReference[];
   stats: StatReference[];
 }
 
 export interface PokemonPayload {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  image_url: string;
  types: TypeReference[] | string[];
  abilities: AbilityReference[] | string [];
  stats: StatReference[] | string[];
}

 export interface TypeReference {
   name: string;
   _id: string;
   ref: 'Type';
 }
 
 export interface AbilityReference {
   name: string;
   _id: string;
   ref: 'Ability';
 }
 
 export interface StatReference {
   _id: string;
   name: any;
   stat: StatTypeReference;
   value: number;
 }
 
 export interface StatTypeReference {
   stat: any;
   name: string;
   _id: string;
   ref: 'Stat';
 }
export interface DeletePokemonCardProps {
  pokemon: { _id: string; name: string };
  onDelete: () => void;
}
