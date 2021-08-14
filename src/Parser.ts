import { MandatoryAttribute } from '@attributes/common';
import { Class, Reflector } from 'agentframework';
import { Schema, SchemaDefinition } from './Schema';

export function GetSchemaIdentifier(value: any): { type: string; format?: string; minLength?: number } | false {
  if (value === null) {
    return { type: 'null' };
  } else if (value === String) {
    return { type: 'string' };
  } else if (value === Number) {
    return { type: 'integer' };
  } else if (value === Boolean) {
    return { type: 'boolean' };
  } else if (Array.isArray(value)) {
    return { type: 'array' };
  } else if (value === Date) {
    return { type: 'string', format: 'date-time' };
  } else if (value === Object) {
    return { type: 'object' };
  } else {
    return false;
  }
}

export function ParseType(schema: Schema, value: Class<any>): SchemaDefinition {
  console.log('type', value);
  const type = Reflector(value);
  const properties = {};
  const required = <any>[];
  for (const p of type.getOwnProperties()) {
    if (typeof p.key !== 'string') {
      // Do not validate symbols
      continue;
    }
    const mandatory = p.hasOwnAttribute(MandatoryAttribute);
    if (mandatory) {
      required.push(p.key);
    }
    const definedType = GetSchemaIdentifier(p.type);
    if (definedType) {
      if (mandatory && definedType.type === 'string') {
        definedType.minLength = 1;
      }
      properties[p.key] = definedType;
    } else if (p.type) {
      properties[p.key] = {
        $ref: '#/definitions/' + p.type.name,
      };
      const definitions = (schema.definitions = schema.definitions || {});
      definitions[p.type.name] = ParseType(schema, p.type);
    }
  }
  return {
    type: 'object',
    properties,
    required,
  };
}
