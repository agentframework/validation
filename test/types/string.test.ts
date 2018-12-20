import { mandatory, optional, Validate } from '../../src/lib';

class StringTest {
  @mandatory()
  required: string;

  @optional()
  optional: string;
}

describe('String Tests', () => {
  describe('#test()', () => {
    it('should validate', () => {
      const Tester = Validate(StringTest);
      expect(
        Tester.test({
          required: 'str',
          optional: ''
        })
      ).toBeTruthy();
    });
  
    it('should not validate empty mandatory string', () => {
      const Tester = Validate(StringTest);
      expect(
        Tester.test({
          required: '',
          optional: ''
        })
      ).toBeFalsy();
    });
  
    it('should not validate wrong mandatory type', () => {
      const Tester = Validate(StringTest);
      expect(
        Tester.test({
          required: 1,
          optional: ''
        })
      ).toBeFalsy();
    });
  
    it('should not validate wrong optional type', () => {
      const Tester = Validate(StringTest);
      expect(
        Tester.test({
          required: 1,
          optional: 1
        })
      ).toBeFalsy();
    });
  });
});
