import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const VALUE = 'value';
const ERR_MSG = 'msg';
const DEFAULT_ERR_MSG = 'Oops!';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue(VALUE)).toBe(VALUE);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError(ERR_MSG)).toThrow(ERR_MSG);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow(DEFAULT_ERR_MSG);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect.assertions(1);
    try {
      await rejectCustomError();
    } catch (error) {
      expect(error).toBeInstanceOf(MyAwesomeError);
    }
  });
});
