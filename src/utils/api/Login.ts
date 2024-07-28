// utils/api/login.ts
import axios from "axios";
import Cookies from 'js-cookie';

const baseURI = process.env.REACT_APP_BASE_URI;

async function loginAPI(username: string, password: string) {
  try {
    const response = await axios.post(`${baseURI}/auth/login`, { username, password });
    const { token } = response.data;
    Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' });
    return { success: true, status: response.status };
  } catch (e: any) {
    return { message: e.response.data.message, status: e.response.status, success: false };
  }
}

export { loginAPI };
