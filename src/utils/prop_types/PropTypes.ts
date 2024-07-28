export interface User {
   id: string,
   username: string,
   password: string
}

export interface Pokemon {
   name: string;
   height: number;
   weight: number;
   base_experience: number;
   image_url: string;
   types: TypeReference[];
   abilities: AbilityReference[];
   stats: StatReference[];
 }
 
 export interface TypeReference {
   _id: string;
   ref: 'Type';
 }
 
 export interface AbilityReference {
   _id: string;
   ref: 'Ability';
 }
 
 export interface StatReference {
   stat: StatTypeReference;
   value: number;
 }
 
 export interface StatTypeReference {
   _id: string;
   ref: 'Stat';
 }
 