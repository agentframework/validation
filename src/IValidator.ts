import { ValidationError } from './ValidationException';

export interface IValidator<T> {
  /**
   * Return true if target match
   */
  test(target: any): boolean;

  /**
   * Throw exception if target not match
   */
  assert(target: any): void;

  /**
   * Return validation result
   */
  validate(target: any): Array<ValidationError>;

  /**
   * Create an empty object
   */
  create(): T;
}
