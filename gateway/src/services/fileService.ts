/**
 * Functions about file management
 */
import * as fs from "fs";
import { List } from "lodash";


 /**
  * Get the path of all files ending with .proto in a folder.
  * @param path Path to the folder to read
  * @returns name of all files ending with .proto
  */
export const getProtoFromFolder = (path: string): string[] => {
    const files: string[] = [];
    fs.readdirSync(path).forEach(file => {
      if (file.endsWith(".proto")) {
        files.push(file);
      }
    });
    return files;
  };
