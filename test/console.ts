// 1. import
import { mandatory, optional, Validate } from '../src/lib';

// 2. define class
class User {
  @mandatory()
  id: number;

  @mandatory()
  name: string;

  @optional()
  email: string;
}

// 3. Create validator for giving type.
const Validator = Validate(User);

// 4. Test input
const input = {
  id: '1',
  name: null
};

Validator.assert(input)
// const match = ;
// console.log('is match?', match);
