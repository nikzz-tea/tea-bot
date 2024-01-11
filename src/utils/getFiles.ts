import { Dirent, readdirSync } from 'fs';

const getFiles = (dir: string, ext: string): string[] => {
  const files: Dirent[] = readdirSync(dir, { withFileTypes: true });
  let commandFiles: string[] = [];

  for (const file of files) {
    if (file.isDirectory()) {
      commandFiles = [...commandFiles, ...getFiles(`${dir}/${file.name}`, ext)];
    } else if (file.name.endsWith(ext)) {
      commandFiles.push(`${dir}/${file.name}`);
    }
  }

  return commandFiles;
};

export default getFiles;
