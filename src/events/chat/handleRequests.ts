import { ChatUserstate } from 'tmi.js';
import parseMapId from '../../utils/parseMapId';
import { v2 } from 'osu-api-extended';
import bancho from '../../api/bancho';
import client from '../../api/twitch';

export default async (channel: string, user: ChatUserstate, message: string, self: boolean) => {
  if (self) return;
  const id = parseMapId(message);
  if (!id) return;
  const map = await v2.beatmap.id.details(Number(id));
  if (!map.beatmapset.artist) return;
  bancho
    .getSelf()
    .sendMessage(
      `${user['display-name']}: [https://osu.ppy.sh/b/${id} ${map.beatmapset.artist} - ${
        map.beatmapset.title
      } [${map.version}]] ${map.difficulty_rating.toFixed(2)}* ${map.bpm} BPM`,
    );
  client.say(
    channel,
    `${map.beatmapset.artist} - ${map.beatmapset.title} [${
      map.version
    }] (${map.difficulty_rating.toFixed(2)}* | ${map.bpm} BPM)`,
  );
};
