export default (message: string) => {
  const urlRegex =
    /https:\/\/osu\.ppy\.sh\/(?:b\/(\d+)|beatmapsets\/\d+\/?\#?osu\/(\d+)|beatmaps\/(\d+))/;
  const match = message.match(urlRegex);
  if (!match) return null;
  return match[1] || match[2] || match[3] || null;
};
