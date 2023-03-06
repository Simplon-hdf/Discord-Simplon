import * as fs from "fs";
import * as path from "path";

export default async (client: any) => {
  const dirPath = "./build/events";
  const eventFiles: [] = getAllFiles(dirPath);

  function getAllFiles(dirPath: any, arrayOfFiles?: any) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      } else {
        arrayOfFiles.push(path.join(dirPath.replace("/build", ""), "/", file));
      }
    });

    return arrayOfFiles;
  }

  for (const file of eventFiles) {
    const event = await import("../" + file);
    if (event.default.once) {
      client.once(event.default.name, (...args: any[]) =>
        event.default.execute(...args)
      );
    } else {
      client.on(event.default.name, (...args: any[]) =>
        event.default.execute(...args)
      );
    }
  }

  setTimeout(() => {
    console.log("---------------[ EVENT(S) ]---------------")
    console.table(eventFiles)
    console.log(`[EVENTS] => ${eventFiles.length} event(s) has been charged !`)
    console.log(" ")
  }, 4000)
};
