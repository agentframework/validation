import { decorateClassField, IAttribute } from 'agentframework';

export function optional() {
  return decorateClassField(new OptionalAttribute());
}

export class OptionalAttribute implements IAttribute {
  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    // allow all class
    return true;
  }
}
