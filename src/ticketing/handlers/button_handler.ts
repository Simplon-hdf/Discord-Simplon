import { readdirSync } from "fs";

export default async (client: any) => {
  console.log("ciouc")
  const buttonFiles = readdirSync(
    `${__dirname}/../../build/components/buttons/`
  ).filter((file) => file.endsWith(".js"));
  for (const file of buttonFiles) {
    const button = (await import(`../components/buttons/${file}`)).default;
    client.buttons.set(button.data.data.custom_id, button);
  }
  setTimeout(() => {
    console.log("---------------[ BUTTON(S) ]---------------")
    console.table(buttonFiles)
    console.log(`[BUTTON] => ${buttonFiles.length} Button(s) has been charged !`)
    console.log(" ")
  }, 1000)
};
