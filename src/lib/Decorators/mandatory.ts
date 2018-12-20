import { decorateClassField, IAttribute } from 'agentframework';

export function mandatory() {
  return decorateClassField(new MandatoryAttribute());
}

export class MandatoryAttribute implements IAttribute {
  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    // allow all class
    return true;
  }
}
