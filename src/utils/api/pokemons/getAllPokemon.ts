import axios from "axios";

const baseURI = process.env.REACT_APP_BASE_URI;

async function getAllPokemons(page: number, search: string) {
  try {
    const response = await axios.get(`${baseURI}/pokemon`, {
      params: {
        page,
        search
      }
    });
    return { data: response.data };

  } catch (e: any) {
    return { message: e.response?.message, status: e.response?.status, success: false };
  }
}

export { getAllPokemons };
