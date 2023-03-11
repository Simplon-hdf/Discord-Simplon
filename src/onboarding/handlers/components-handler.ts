import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import CustomComponent from '../components/CustomComponent';
import { ClientManager } from '../utils/client-manager';

export default async () => {
  dotenv.config();

  const componentsFiles: string[] = getAllFiles('./build/components/');

  function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    try {
      const files = fs.readdirSync(dirPath);
      files.forEach((file) => {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
          arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
        } else {
          arrayOfFiles.push(path.join(dirPath, '/', file));
        }
      });
    } catch (error) {
      console.log(error);
    }
    return arrayOfFiles;
  }

  for (const file of componentsFiles) {
    if (file.includes('CustomComponent')) continue;
    const component: CustomComponent = new (
      await import(`../../${file}`)
    ).default() as CustomComponent;
    ClientManager.add_component(component);
  }
};
