export interface SchemaProperty {
  type: string;
  items?: SchemaDefinition;
  default?: Array<any>;
}

export interface SchemaProperties {
  [x: string]: SchemaProperty;
}

export interface SchemaDefinition {
  type: string;
  properties: SchemaProperties;
  required?: Array<string>;
}

export interface SchemaDefinitions {
  [x: string]: SchemaDefinition;
}

export interface Schema extends SchemaDefinition {
  name: string;
  definitions?: SchemaDefinitions;

  type: string;
  properties: SchemaProperties;
  required?: Array<string>;
}
