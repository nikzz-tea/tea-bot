import dotenv from 'dotenv';
import { BanchoClient } from 'bancho.js';

dotenv.config();

export default new BanchoClient({
  username: process.env.OSU_USERNAME as string,
  password: process.env.OSU_SERVER_PASSWORD as string,
});
