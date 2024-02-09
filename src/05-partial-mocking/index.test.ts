import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  const originalConsoleLog = global.console.log;

  beforeAll(() => {
    global.console.log = jest.fn();
  });

  afterAll(() => {
    jest.unmock('./index');
    global.console.log = originalConsoleLog;
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();
    expect(global.console.log).toBeCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
    expect(global.console.log).toBeCalledTimes(1);
  });
});
