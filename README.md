# @agentframework/validation

### What is it?

A zero-configuration validation framework [Demo](https://github.com/agentframework/validation-example)

### Support Types

- boolean
- number
- string
- null
- Nested class

### How it works?

This framework will analysis your class and create a validator using `ajv` for you.

### Steps

1. Use class to define your data and mark @mandatory or @optional for the field.

2. Create a Validator `const validator = Validate(YOUR_CLASS)`

3. Validate object using `validator.test({ id: 1, name: 1 })`

### API

#### Validate

- function Validate(yourClassType: any): Validator - Create a validator, this validator can be reuse.

- IValidator.test(obj: any): boolean - validate the object, return true if the object match the Class definition.
- IValidator.validate(obj: any): Array<ValidateError> - validate the object, return validation errors, if object match, return empty array[]

```ts
// Data Models
class ProjectModel {
  @mandatory()
  name: string
}

class DataModel {
  owner: string
  project: ProjectModel
}


// User input
const body = {
                owner: 'Peter',
                project: {
                   name: 1
                }
             }

// Validation Result
const validator = Validate(DataModel)
const results = validator.validate(body)

/*
 results = [
   {
     dataPath: '.project.name',
     params: { type: 'string' },
     message: 'should be string'
   }
 ]
*/
```
