import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/layout/layout';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Pokemons from './pages/pokemon/pokemons';
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="auth/login" element={<Login />} />
      <Route path="auth/register" element={<Register />} />
     
      <Route path="/" element={<Layout />}>
        <Route index element={<Pokemons />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
