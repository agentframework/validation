import { Validate } from '../../lib';
import { mandatory, optional } from '@typescript-decorators/common';

class BooleanTest {
  @mandatory()
  required!: boolean;

  @optional()
  optional!: boolean;
}

describe('Boolean Tests', () => {
  describe('#test()', () => {
    it('should validate', () => {
      const Tester = Validate(BooleanTest);
      expect(
        Tester.test({
          required: true
        })
      ).toBeTruthy();
    });

    it('should not validate undefined mandatory', () => {
      const Tester = Validate(BooleanTest);
      expect(
        Tester.test({
          required: undefined
        })
      ).toBeFalsy();
    });

    it('should not validate null mandatory', () => {
      const Tester = Validate(BooleanTest);
      expect(
        Tester.test({
          required: null
        })
      ).toBeFalsy();
    });

    it('should not validate wrong mandatory type', () => {
      const Tester = Validate(BooleanTest);
      expect(
        Tester.test({
          required: 1
        })
      ).toBeFalsy();
    });

    it('should not validate wrong optional type', () => {
      const Tester = Validate(BooleanTest);
      expect(
        Tester.test({
          required: true,
          optional: 1
        })
      ).toBeFalsy();
    });
  });
});
