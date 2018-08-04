/**
 * File to store every miscellaneous type.
 * When some types are linked, you better create a new file for them.
 */

 export type Schema = {
    syntax: number,
    package: string,
    import: Array<any>,
    enums: Array<any>,
    messages: Array<Message>,
    options: any,
    extends: Array<any>,
    services: Array<Service>,
 };

 export type Message = {
     name: string,
     enums: Array<any>,
     extends: Array<any>,
     messages: Array<any>,
     fields: Array<Field>,
     extensions: any,
 };

 export type Field = {
    name: string,
    type: string,
    tag: number,
    map: any,
    oneof: any,
    required: boolean,
    repeated: boolean,
    options: any,
 };

 export type Service = {
    name: string,
    methods: Array<Method>,
    options: any
 };

 export type Method = {
    name: string,
    input_type: string,
    output_type: string,
    client_streaming: boolean,
    server_streaming: boolean,
    options: any
 };

 /**
  * Schema as stored in the database
  */
 export type StoredSchema = {
    name: string,
    filePath: string,
    schema: Schema
 };