import { readdirSync } from "fs";

export default async (client: any) => {
  const modalFiles = readdirSync(`${__dirname}/../../build/components/buttons/`).filter(
    (file) => file.endsWith(".js")
  );
  for (const file of modalFiles) {
    const modal = (await import(`../components/modals/${file}`)).default;
    client.modals.set(modal.data.data.custom_id, modal);
  }
  setTimeout(() => {
    console.log("---------------[ MODAL(S) ]---------------")
    console.table(modalFiles)
    console.log(`[MODALS] => ${modalFiles.length} modal(s) has been charged !`)
    console.log(" ")
  }, 2000)
};
