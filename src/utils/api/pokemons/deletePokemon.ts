import axios from "axios";
import Cookies from 'js-cookie';

const baseURI = process.env.REACT_APP_BASE_URI;

async function deletePokemon(id: number) {
  const token = Cookies.get('token');

  if (!token) {
    return { 
      message: 'No authentication token found', 
      status: 401, 
      success: false 
    };
  }

  try {
    const response = await axios.delete(
      `${baseURI}/pokemon/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data: response.data, success: true };

  } catch (e: any) {
    return { 
      message: e.response?.data?.message || 'An error occurred', 
      status: e.response?.status, 
      success: false 
    };
  }
}

export { deletePokemon };
