import { mandatory, optional, Validate } from '../../src/lib';

class Project {
  @mandatory()
  name: string;
}

class User {
  @mandatory()
  name: string;

  @optional()
  project: Project;
}

describe('Nested Tests', () => {
  describe('#validate()', () => {
    it('should validate', () => {
      const Tester = Validate(User);
      expect(
        Tester.validate({
          name: 'jim'
        })
      ).toEqual([]);
    });

    it('should validate', () => {
      const Tester = Validate(User);
      expect(
        Tester.validate({
          name: 'jim',
          project: {
            name: 'cms'
          }
        })
      ).toEqual([]);
    });

    it('should not validate', () => {
      const Tester = Validate(User);
      expect(
        Tester.validate({
          name: 'jim',
          project: {
            name: 1
          }
        })
      ).toEqual([{ dataPath: '.project.name', params: { type: 'string' }, message: 'should be string' }]);
    });
  });
});
