import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 2, action: 'not existing action', expected: null },
  { a: 'invalid arg', b: 2, action: Action.Add, expected: null },
  { a: 3, b: 'invalid arg', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'expected that $a $action $b = $expected',
    ({ a, b, action, expected }): void => {
      expect(simpleCalculator({ a, b, action })).toEqual(expected);
    },
  );
});
