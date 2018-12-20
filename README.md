@agentframework/validation
====================================

### What is it?

A zero-configuration validation framework

### Types

- boolean
- number
- string
- Nested class

### How it works?

```ts
// 1. import
import { mandatory, optional, Validate } from '@agentframework/validation';

// 2. define class using AgentFramework way
class User {
  @mandatory()
  id: number;

  @mandatory()
  name: string;

  @optional()
  email: string;
}

// 3. The object to validate
const input = {
  id: 1,
  name: 'Ling'
};

// 3. Create validator for the class and test the result

const Validator = Validate(User);

console.log('is match?', Validator.test(input));
// is match? true
```
