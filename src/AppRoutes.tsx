import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/layout/layout';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Pokemons from './pages/pokemon/pokemons';
import CreatePokemon from './pages/pokemon/createPokemon';
import EditPokemon from './pages/pokemon/editPokemon';
import Pokemon from './pages/pokemon/pokemon';
import DeletePokemons from './pages/pokemon/deletePokemons';
import ProtectedRoute from './utils/middleware/ProtectedRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="auth/login" element={<Login />} />
      <Route path="auth/register" element={<Register />} />
      
      <Route path="/" element={<Layout />}>
        <Route index element={<Pokemons />} />
        <Route path='/pokemon/:id' element={<Pokemon />} />
        <Route 
          path='/pokemon/create' 
          element={<ProtectedRoute element={<CreatePokemon />} restricted />} 
        />
        <Route 
          path='/pokemon/edit/:id' 
          element={<ProtectedRoute element={<EditPokemon />} restricted />} 
        />
        <Route 
          path='/pokemon/delete' 
          element={<ProtectedRoute element={<DeletePokemons />} restricted />} 
        />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
