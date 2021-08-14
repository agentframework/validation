import { mandatory, optional } from '@typescript-decorators/common';
import { Validate } from '../../lib';

class NumberTest {
  @mandatory()
  required!: number;

  @optional()
  optional!: number;
}

describe('Number Tests', () => {
  describe('#test()', () => {
    it('should validate', () => {
      const Tester = Validate(NumberTest);
      expect(
        Tester.test({
          required: 1,
        })
      ).toBeTruthy();
    });

    it('should not validate empty mandatory string', () => {
      const Tester = Validate(NumberTest);
      expect(
        Tester.test({
          required: null,
        })
      ).toBeFalsy();
    });

    it('should not validate wrong mandatory type', () => {
      const Tester = Validate(NumberTest);
      expect(
        Tester.test({
          required: '1',
        })
      ).toBeFalsy();
    });

    it('should not validate wrong optional type', () => {
      const Tester = Validate(NumberTest);
      expect(
        Tester.test({
          required: 1,
          optional: '',
        })
      ).toBeFalsy();
    });
  });
});
