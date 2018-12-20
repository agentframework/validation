import { Exception } from 'agentframework';

// errors [
//   { keyword: 'type',
//     dataPath: '.id',
//     schemaPath: '#/properties/id/type',
//     params: { type: 'integer' },
//     message: 'should be integer' },
//   { keyword: 'type',
//     dataPath: '.name',
//     schemaPath: '#/properties/name/type',
//     params: { type: 'string' },
//     message: 'should be string' }
// ]

export interface ValidationError {
  dataPath: string;
  params: any;
  message?: string;
}

export class ValidationException extends Exception {
  context: Array<ValidationError>;

  constructor(errors?: Array<any> | null) {
    super('Validation failed');
    if (Array.isArray(errors)) {
      this.context = errors.map(error => {
        return {
          dataPath: error.dataPath,
          params: error.params,
          message: error.message
        };
      });
    }
  }
}
