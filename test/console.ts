// 1. import
import { mandatory, optional } from '@typescript-decorators/common';
import { Validate } from '../lib';

// 2. define class
class User {
  @mandatory()
  id!: number;

  @mandatory()
  name!: string;

  @optional()
  email!: string;
}

// 3. Create validator for giving type.
const Validator = Validate(User);

// 4. Test input
const input = {
  id: '1',
  name: null,
  email: { id: 1 },
};

try {
  Validator.assert(input);
  console.log('NG');
} catch (e) {
  console.log('OK', e);
}

// const match = ;
// console.log('is match?', match);
