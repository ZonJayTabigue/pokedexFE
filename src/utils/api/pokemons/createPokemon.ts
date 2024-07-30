import axios from "axios";
import Cookies from 'js-cookie';

const baseURI = process.env.REACT_APP_BASE_URI;

async function createPokemon(payload: any) {
  const token = Cookies.get('token');

  try {
    const response = await axios.post(
      `${baseURI}/pokemon/create`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data: response.data };

  } catch (e: any) {
    return { 
      message: e.response?.data?.message || 'An error occurred', 
      status: e.response?.status, 
      success: false 
    };
  }
}

export { createPokemon };
