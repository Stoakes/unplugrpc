/**
 * Functions about file management
 */
import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as path from "path";

/**
 * Get the path of all files ending with .proto in a folder.
 * @param folderPath Path to the folder to read
 * @param files array of path
 * @returns path of all files ending with .proto within folderPath
 */
export const getProtoFromFolder = (
  folderPath: string,
  files: string[] = []
): string[] => {
  fs.readdirSync(folderPath).forEach(file => {
    file = path.join(folderPath, file);
    if (fs.statSync(file).isDirectory()) {
      getProtoFromFolder(file, files);
    } else {
      if (file.endsWith(".proto")) {
        files.push(file);
      }
    }
  });
  return files;
};

/**
 * Create the tree of fodler for a path.
 * Example: createFolderTree('/tmp/hello/hello.proto) will create /tmp/hello if possible
 * TODO: Adapt to handle other than / folder separators.
 * @param path
 */
export const createFolderTree = (folder: string): string => {
  if (folder.endsWith(".proto")) {
    const splitted = folder.split("/");
    folder = splitted.slice(0, splitted.length - 1).join("/");
  }
  try {
    mkdirp.sync(folder);
    return "";
  } catch (error) {
    return error.message;
  }
};
