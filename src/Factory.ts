import { Class } from 'agentframework';
import { IValidator } from './IValidator';
import { Validator } from './Validator';

export function Validate<U1 extends object>(type: Class<U1>): IValidator<U1> {
  return new Validator<U1>(type);
}
