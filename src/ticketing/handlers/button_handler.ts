import { readdirSync } from "fs";
export default async (client: any) => {
  const buttonFolders = readdirSync(`${__dirname}/../../components/buttons`);
  for (const category of buttonFolders) {
    const buttonFiles = readdirSync(
      `${__dirname}/../../build/components/buttons/${category}`
    ).filter((file) => file.endsWith(".js"));
    for (const file of buttonFiles) {
      const button = (await import(`../components/buttons/${category}/${file}`)).default;
      client.buttons.set(button.data.data.custom_id, button);
    }
  }
  setTimeout(() => {
    console.log("---------------[ BUTTON(S) ]---------------")
    console.table(buttonFolders)
    console.log(`[BUTTON] => ${buttonFolders.length} Button(s) has been charged !`)
    console.log(" ")
  }, 1000)
};
