import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

const INTERVAL = 1000;
const FILE_CONTENT = 'file content';
const PATH_TO_FILE = '/path/to/file';

const callback = jest.fn();

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    callback.mockClear();
    jest.clearAllTimers();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, INTERVAL);

    expect(global.setTimeout).toBeCalledWith(callback, INTERVAL);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, INTERVAL);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(INTERVAL);

    expect(callback).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeEach(() => {
    callback.mockClear();
    jest.clearAllTimers();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, INTERVAL);

    expect(global.setInterval).toBeCalledWith(callback, INTERVAL);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callsNum = 5;

    doStuffByInterval(callback, INTERVAL);

    for (let i = 1; i <= callsNum; i++) {
      jest.advanceTimersByTime(INTERVAL);
      expect(callback).toBeCalledTimes(i);
    }
  });
});

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.spyOn(path, 'join').mockImplementation(() => 'path');
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockImplementation(() => Promise.resolve(FILE_CONTENT));
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(PATH_TO_FILE);

    expect(path.join).toBeCalledWith(__dirname, PATH_TO_FILE);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);

    expect(await readFileAsynchronously(PATH_TO_FILE)).toBeNull();
  });

  test('should return file content if file exists', async () => {
    expect(await readFileAsynchronously(PATH_TO_FILE)).toBe(FILE_CONTENT);
  });
});
