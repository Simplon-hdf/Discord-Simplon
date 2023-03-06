import { readdirSync } from "fs";

export default async (client: any) => {
    const buttonFiles = readdirSync(
      `${__dirname}/../modals/`
    ).filter((file) => file.endsWith(".js"));
    for (const file of buttonFiles) {
      const button = (await import(`../modals/${file}`)).default;
      client.modals.set(button.data.data.custom_id, button);
    }
};
