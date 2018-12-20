import { mandatory, optional, Validate } from '../../src/lib';

class DateTest {
  @mandatory()
  required: Date;

  @optional()
  optional: Date;
}

describe('Date Tests', () => {
  describe('#validate()', () => {
    it('should validate', () => {
      const Tester = Validate(DateTest);
      expect(
        Tester.validate({
          required: new Date().toISOString()
        })
      ).toEqual([]);
    });

    it('should not validate', () => {
      const Tester = Validate(DateTest);
      expect(
        Tester.validate({
          required: 1
        })
      ).toEqual([{ dataPath: '.required', params: { type: 'string' }, message: 'should be string' }]);
    });

    it('should not validate', () => {
      const Tester = Validate(DateTest);
      expect(
        Tester.validate({
          required: new Date().toISOString(),
          optional: ''
        })
      ).toEqual([
        { dataPath: '.optional', params: { format: 'date-time' }, message: 'should match format "date-time"' }
      ]);
    });
  });
});
