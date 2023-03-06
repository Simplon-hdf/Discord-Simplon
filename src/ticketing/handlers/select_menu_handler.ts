import { readdirSync } from "fs";

export default async (client: any) => {
  const selectMenuFiles = readdirSync(
    `${__dirname}/../../build/components/select_menu/`
  ).filter((file) => file.endsWith(".js"));
  for (const file of selectMenuFiles) {
    const selectMenu = (await import(`../components/select_menu/${file}`)).default;
    client.selectmenu.set(selectMenu.data.data.custom_id, selectMenu);
  }

  setTimeout(() => {
    console.log("---------------[ SELECT MENU(S) ]---------------")
    console.table(selectMenuFiles)
    console.log(`[SELECT MENU] => ${selectMenuFiles.length} Select Menu(s) has been charged !`)
    console.log(" ")
  }, 3000)

};
