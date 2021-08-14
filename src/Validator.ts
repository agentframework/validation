import { Class } from 'agentframework';
import { ParseType } from './Parser';
import { IValidator } from './IValidator';
import { ValidationError, ValidationException } from './ValidationException';
import * as Ajv from 'ajv';
const SymbolType = Symbol();
const SymbolValidate = Symbol();

export class Validator<T extends object> implements IValidator<T> {
  private readonly [SymbolType]: Class<T>;
  private readonly [SymbolValidate]: any;

  constructor(type: Class<T>) {
    const schema = <any>{};
    const root = ParseType(schema, type);
    Object.assign(schema, root);
    const ajv = new Ajv({ allErrors: true });
    this[SymbolValidate] = ajv.compile(schema);
    this[SymbolType] = type;
  }

  test(target: any): boolean {
    const result = this[SymbolValidate](target);
    if (typeof result !== 'boolean') {
      throw new TypeError('Invalid validation result');
    }
    return result;
  }

  assert(target: any): void {
    const result = this[SymbolValidate](target);
    if (typeof result !== 'boolean') {
      throw new TypeError('Invalid validation result');
    }
    if (!result) {
      throw new ValidationException(this[SymbolValidate].errors);
    }
  }

  validate(target: any): Array<ValidationError> {
    const result = this[SymbolValidate](target);
    if (typeof result !== 'boolean') {
      throw new TypeError('Invalid validation result');
    }
    if (!result) {
      const errors = this[SymbolValidate].errors;
      if (Array.isArray(errors)) {
        return errors.map((error) => {
          return {
            dataPath: error.dataPath,
            params: error.params,
            message: error.message,
          };
        });
      }
    }
    return [];
  }

  /**
   * Create an object with default values
   */
  create(): T {
    return Reflect.construct(this[SymbolType], []);
  }
}
