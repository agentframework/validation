import { TypedConstructor } from 'agentframework';
import { IValidator } from './IValidator';
import { Validator } from './Validator';

export function Validate<U1>(type: TypedConstructor<U1>): IValidator<U1> {
  return new Validator<U1>(type);
}
