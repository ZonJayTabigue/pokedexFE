import React from 'react'
import Header from './Header';
import { Outlet } from 'react-router-dom';
// import Pokemons from '../pokemon/pokemons';
const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout