/**
 * Functions about file management
 */
import * as fs from "fs";
import * as mkdirp from "mkdirp";

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

/**
 * Create the tree of fodler for a path.
 * Example: createFolderTree('/tmp/hello/hello.proto) will create /tmp/hello if possible
 * @param path 
 */
export const createFolderTree = (path: string): string => {
  if(path.endsWith('.proto')) {
    const splitted = path.split('/')
    path = splitted.slice(0,splitted.length-1).join('/');
  }
  try {
    mkdirp.sync(path);
    return "";
  } catch (error) {
    return error.message;
  }
}