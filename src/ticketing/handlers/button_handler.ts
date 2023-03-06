import { readdirSync } from "fs";

export default async (client: any) => {
    const buttonFiles = readdirSync(
      `${__dirname}/../buttons/`
    ).filter((file) => file.endsWith(".js"));
    for (const file of buttonFiles) {
      const button = (await import(`../buttons/${file}`)).default;
      client.buttons.set(button.data.data.custom_id, button);
    }
};
