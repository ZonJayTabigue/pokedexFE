import axios from "axios";

const baseURI = process.env.REACT_APP_BASE_URI;

async function getPokemon(id: string | undefined) {
  try {
    const response = await axios.get(`${baseURI}/pokemon/${id}`);
    return { data: response.data };

  } catch (e: any) {
    return { message: e.response?.message, status: e.response?.status, success: false };
  }
}

export { getPokemon };
