import axios from "axios";

const baseURI = process.env.REACT_APP_BASE_URI;

async function registerAPI(username: string, password: string) {
  try {
    const response = await axios.post(`${baseURI}/auth/register`, { username, password });
    console.log('error: ', response);
    return { status: response.status, message: response.data.message };

  } catch (e: any) {
    return { message: e.response.data.message, status: e.response.status, success: false };
  }
}

export { registerAPI };
