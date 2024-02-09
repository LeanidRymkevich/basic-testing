import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const RELATIVE_URL = '/todos/1';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  test('should create instance with provided base url', async () => {
    jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(RELATIVE_URL);

    expect(axios.create).toBeCalledWith({ baseURL: BASE_URL });
    expect(axios.create).toReturn();
  });

  // test('should perform request to correct provided url', async () => {
  // });

  // test('should return response data', async () => {
  //   expect(await throttledGetDataFromApi(RELATIVE_URL)).toBe(RELATIVE_URL);
  // });
});
