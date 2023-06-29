import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 7, b: 6, action: Action.Add, expected: 13 },
  { a: 7, b: 6, action: Action.Subtract, expected: 1 },
  { a: 7, b: 6, action: Action.Multiply, expected: 42 },
  { a: 12, b: 6, action: Action.Divide, expected: 2 },
  { a: 2, b: 10, action: Action.Exponentiate, expected: 1024 },
  { a: 12, b: 6, action: 'InvalidAction', expected: null },
  { a: 'invalid', b: 'argument', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'calculation failed, `$a$action$b!=$expected`',
    ({ a, b, action, expected }) => {
      const input = { a, b, action };
      const result = simpleCalculator(input);
      expect(result).toEqual(expected);
    },
  );
});
