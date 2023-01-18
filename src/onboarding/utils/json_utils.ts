import * as fs from "fs";

export const set = async (filePath: string, key, value ) => {
    const file = fs.readFileSync(filePath);

    if(file.length == 0){
        await fs.writeFileSync(filePath, JSON.stringify({[key] : value}));
    }else{
        const json = JSON.parse(file.toString());
        json[key] = value;
        fs.writeFileSync(filePath, JSON.stringify(json))
    }
}

export const get = async (filePath : string) => {
    const file = fs.readFileSync(filePath);

    if(file.length != 0){
        return JSON.parse(file.toString());
    }

    return '';
}