import axios from 'axios';
import { gosumemoryURL } from '../config.json';
import GosuData from '../models/gosuData';

export default async () => {
  try {
    const { data } = await axios.get<GosuData>(gosumemoryURL);
    return data;
  } catch (error) {
    console.error(`gosu: error\n${error}`);
  }
};
