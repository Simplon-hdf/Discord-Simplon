import * as fs from 'fs';
import * as path from 'path';
import DiscordEvent from '../events/DiscordEvent';
import { ClientManager } from '../utils/client-manager';

export default async () => {
  const eventFiles: string[] = getAllFiles('./build/events/');

  function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    try {
      const files = fs.readdirSync(dirPath);
      files.forEach(function (file) {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
          arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
        } else {
          arrayOfFiles.push(path.join('events/', file));
        }
      });
    } catch (error) {
      console.log(error);
    }
    return arrayOfFiles;
  }

  for (const file of eventFiles) {
    if ((file as string).includes('DiscordEvent')) continue;
    try {
      const event: DiscordEvent = new (await import(`../${file}`)).default();
      if (event.get_method() == 'once')
        ClientManager.get_client().once(event.get_type() as any, () =>
          event.execute(),
        );
      else
        ClientManager.get_client().on(event.get_type() as any, () =>
          event.execute(),
        );
      ClientManager.add_event(event);
    } catch {
      console.log(
        `${file} command can't be load (maybe it's not a constructor)`,
      );
    }
  }
};
