import { Constructor, Reflector } from 'agentframework';
import { Schema, SchemaDefinition } from './Schema';
import { MandatoryAttribute } from './Decorators/mandatory';

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

export function ParseType(schema: Schema, value: Constructor): SchemaDefinition {
  const type = Reflector(value);
  const properties = {};
  const required = <any>[];
  for (const p of type.getProperties()) {
    if (typeof p.targetKey !== 'string') {
      // Do not validate symbols
      continue;
    }
    const mandatory = p.value().hasAttribute(MandatoryAttribute);
    if (mandatory) {
      required.push(p.targetKey);
    }
    const definedType = GetSchemaIdentifier(p.type);
    if (definedType) {
      if (mandatory && definedType.type === 'string') {
        definedType.minLength = 1;
      }
      properties[p.targetKey] = definedType;
    } else {
      properties[p.targetKey] = {
        $ref: '#/definitions/' + p.type.name
      };
      const definitions = (schema.definitions = schema.definitions || {});
      definitions[p.type.name] = ParseType(schema, p.type);
    }
  }
  return {
    type: 'object',
    properties,
    required
  };
}
