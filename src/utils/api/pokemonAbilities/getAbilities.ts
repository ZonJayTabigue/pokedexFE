import axios from "axios";

const baseURI = process.env.REACT_APP_BASE_URI;

async function getAllAbilities() {
  try {
    const response = await axios.get(`${baseURI}/ability/`);
    return { data: response.data };

  } catch (e: any) {
    return { message: e.response?.message, status: e.response?.status, success: false };
  }
}

export { getAllAbilities };
