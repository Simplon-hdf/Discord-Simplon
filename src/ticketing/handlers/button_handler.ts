import { readdirSync } from "fs";

export default async (client: any) => {
  const buttonFolders = readdirSync(`${__dirname}/../../buttons`);
  for (const category of buttonFolders) {
    const buttonFiles = readdirSync(
      `${__dirname}/../buttons/${category}`
    ).filter((file) => file.endsWith(".js"));
    for (const file of buttonFiles) {
      const button = (await import(`../buttons/${category}/${file}`)).default;
      client.buttons.set(button.data.data.custom_id, button);
    }
  }
};
