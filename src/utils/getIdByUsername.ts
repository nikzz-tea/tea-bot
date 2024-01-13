import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const client_id = process.env.TWITCH_CLIENT_ID;
const client_secret = process.env.TWITCH_CLIENT_SECRET;

export default async (login: string) => {
  const tokenResponse = await axios.post('https://id.twitch.tv/oauth2/token', null, {
    params: { client_id, client_secret, grant_type: 'client_credentials' },
  });
  const token = tokenResponse.data.access_token;
  const { data } = await axios.get(`https://api.twitch.tv/helix/users`, {
    params: { login },
    headers: {
      'Client-ID': client_id,
      Authorization: 'Bearer ' + token,
    },
  });
  if (!data.data.length) return undefined;
  return data.data[0].id;
};
