import axios from 'axios';
import dotenv from 'dotenv';
import TwitchUser from '../models/twitchUserData';

dotenv.config();

const client_id = process.env.TWITCH_CLIENT_ID;
const client_secret = process.env.TWITCH_CLIENT_SECRET;

export default async (login?: string, id?: string) => {
  const tokenResponse = await axios.post('https://id.twitch.tv/oauth2/token', null, {
    params: { client_id, client_secret, grant_type: 'client_credentials' },
  });
  const token = tokenResponse.data.access_token;
  let params;
  if (!login && !id) return;
  if (login) params = { login };
  if (id) params = { id };
  const { data } = await axios.get<TwitchUser>(`https://api.twitch.tv/helix/users`, {
    params,
    headers: {
      'Client-ID': client_id,
      Authorization: 'Bearer ' + token,
    },
  });
  if (!data.data.length) return undefined;
  return data.data[0];
};
