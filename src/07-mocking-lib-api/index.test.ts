import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  CreateAxiosDefaults,
} from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const RELATIVE_URL = '/todos/1';

const config = { baseURL: BASE_URL };
const response = { data: BASE_URL };
const axiosClient = axios.create(config);

describe('throttledGetDataFromApi', () => {
  let getMock: jest.SpyInstance<
    Promise<unknown>,
    [url: string, config?: AxiosRequestConfig<unknown> | undefined],
    unknown
  >;
  let createMock: jest.SpyInstance<
    AxiosInstance,
    [config?: CreateAxiosDefaults<unknown> | undefined],
    unknown
  >;

  beforeEach(() => {
    getMock = jest
      .spyOn(axiosClient, 'get')
      .mockImplementation(() => Promise.resolve(response));
    createMock = jest
      .spyOn(axios, 'create')
      .mockImplementation(() => axiosClient);
  });

  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(RELATIVE_URL);

    expect(createMock).toBeCalledWith({ baseURL: BASE_URL });
  });

  test('should perform request to correct provided url', async () => {
    jest.advanceTimersByTime(THROTTLE_TIME);

    await throttledGetDataFromApi(RELATIVE_URL);

    expect(getMock).toBeCalledWith(RELATIVE_URL);
  });

  test('should return response data', async () => {
    jest.advanceTimersByTime(THROTTLE_TIME);

    await throttledGetDataFromApi(RELATIVE_URL);

    expect(await throttledGetDataFromApi(RELATIVE_URL)).toBe(response.data);
  });
});
