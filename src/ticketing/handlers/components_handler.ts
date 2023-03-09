import { Collection } from "discord.js";
import { readdirSync } from "fs";

declare module "discord.js" {
  export interface Client {
    components: Collection<string, any>;
  }
}

export default async (client: any) => {
  client.components = new Collection();
  const componentsFolders = readdirSync(`${__dirname}/../../components/`);
  for (const category of componentsFolders) {
    const componentsFiles = readdirSync(
      `${__dirname}/../../build/components/${category}`
    ).filter((file) => file.endsWith(".js"));
    for (const file of componentsFiles) {
      const component = (await import(`../components/${category}/${file}`)).default;
      client.components.set(component.data.data.custom_id, component);
    }
  }
  setTimeout(() => {
    console.log("---------------[ COMPONENT(S) ]---------------")
    console.table(componentsFolders)
    console.log(`[COMPONENTS] => ${componentsFolders.length} Components(s) folder has been charged !`)
    console.log(" ")
  }, 1000)
};
