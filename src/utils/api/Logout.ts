import axios from "axios";
import Cookies from 'js-cookie';

const baseURI = process.env.REACT_APP_BASE_URI;

async function logoutAPI() {
  try {
    const response = await axios.post(`${baseURI}/auth/logout`);
    Cookies.remove('token');
    return { success: true, status: response.status };
  } catch (e: any) {
    return { message: e.response.data.message, status: e.response.status, success: false };
  }
}

export { logoutAPI };
