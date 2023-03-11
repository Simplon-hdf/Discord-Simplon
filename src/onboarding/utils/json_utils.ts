import * as fs from "fs";

export const set = async (filePath: string, key, value ) => {
    const file = fs.readFileSync(filePath);

    if(file.length == 0){
        await fs.writeFileSync(filePath, JSON.stringify({[key] : value}, null, 4));
    }else{
        const json = JSON.parse(file.toString());
        json[key] = value;
        fs.writeFileSync(filePath, JSON.stringify(json, null, 4))
    }
}

export const get = async (filePath : string) => {
    const file = fs.readFileSync(filePath);

    if(file.length != 0){
        return JSON.parse(file.toString());
    }

    return '';
}

export const redefine = async (filePath: string, toWrite) => {
    const file = fs.readFileSync(filePath);
    if(file.length == 0) await fs.writeFileSync(file, JSON.stringify(toWrite, null, 4));
    else fs.writeFileSync(filePath, JSON.stringify(toWrite, null, 4));
    
}
