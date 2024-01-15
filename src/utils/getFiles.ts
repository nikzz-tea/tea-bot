import { Dirent, readdirSync } from 'fs';

const getFiles = (dir: string): string[] => {
  const files: Dirent[] = readdirSync(dir, { withFileTypes: true });
  let commandFiles: string[] = [];

  for (const file of files) {
    if (file.isDirectory()) {
      commandFiles = [...commandFiles, ...getFiles(`${dir}/${file.name}`)];
    } else if (file.isFile()) {
      commandFiles.push(`${dir}/${file.name}`);
    }
  }

  return commandFiles;
};

export default getFiles;
