/**
 * File to store every miscellaneous type.
 * When some types are linked, you better create a new file for them.
 */

export interface Schema {
  syntax: number;
  package: string;
  import: any[];
  enums: any[];
  messages: Message[];
  options: any;
  extends: any[];
  services: Service[];
}

export interface Message {
  name: string;
  enums: any[];
  extends: any[];
  messages: any[];
  fields: Field[];
  extensions: any;
}

export interface Field {
  name: string;
  type: string;
  tag: number;
  map: any;
  oneof: any;
  required: boolean;
  repeated: boolean;
  options: any;
}

export interface Service {
  name: string;
  methods: Method[];
  options: any;
}

export interface Method {
  name: string;
  input_type: string;
  output_type: string;
  client_streaming: boolean;
  server_streaming: boolean;
  options: any;
}

/**
 * Schema as stored in the database
 */
export interface StoredSchema {
  name: string;
  filePath: string;
  schema: Schema;
}

/**
 * A host is a server exposing a grpc interface
 */
export interface Host {
  name: string;
  host: string;
  port: number;
}
