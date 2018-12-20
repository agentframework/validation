import { mandatory, optional, Validate, ValidationException } from '../../src/lib';

class User {
  @mandatory()
  id: number;

  @mandatory()
  name: string;

  @optional()
  email: string;
}

describe('Validator Tests', () => {
  
  describe('#test()', () => {
    it('should not validate empty object', () => {
      const UserValidator = Validate(User);
      expect(UserValidator.test({})).toBeFalsy();
    });

    it('should validate user', () => {
      const UserValidator = Validate(User);
      expect(
        UserValidator.test({
          id: 1,
          name: 'peter',
          email: 'a@b.com'
        })
      ).toBeTruthy();
    });

    it('should validate user without email', () => {
      const UserValidator = Validate(User);
      expect(
        UserValidator.test({
          id: 1,
          name: 'peter'
        })
      ).toBeTruthy();
    });

    it('should not validate null', () => {
      const UserValidator = Validate(User);
      expect(UserValidator.test(null)).toBeFalsy();
    });

    it('should not validate undefined', () => {
      const UserValidator = Validate(User);
      expect(UserValidator.test(undefined)).toBeFalsy();
    });

    it('should not validate empty object', () => {
      const UserValidator = Validate(User);
      expect(UserValidator.test({})).toBeFalsy();
    });

    it('should not validate user without name', () => {
      const UserValidator = Validate(User);
      expect(
        UserValidator.test({
          id: 1
        })
      ).toBeFalsy();
    });
  });

  describe('#validate()', () => {
    it('should not validate null', () => {
      const UserValidator = Validate(User);
      expect(() => {
        UserValidator.assert(null);
      }).toThrowError(ValidationException);
    });

    it('should not validate undefined', () => {
      const UserValidator = Validate(User);
      expect(() => {
        UserValidator.assert(undefined);
      }).toThrowError(ValidationException);
    });

    it('should not validate empty object', () => {
      const UserValidator = Validate(User);
      expect(() => {
        UserValidator.assert({});
      }).toThrowError(ValidationException);
    });

    it('should not validate user without name', () => {
      const UserValidator = Validate(User);
      expect(() => {
        UserValidator.assert({
          id: 1
        });
      }).toThrowError(ValidationException);
    });

    it('should validate user', () => {
      const UserValidator = Validate(User);
      UserValidator.assert({
        id: 1,
        name: 'peter',
        email: 'a@b.com'
      });
    });

    it('should validate user without email', () => {
      const UserValidator = Validate(User);
      UserValidator.test({
        id: 1,
        name: 'peter'
      });
    });
  });
});
