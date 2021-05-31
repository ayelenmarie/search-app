import { AxiosResponse } from 'axios';

const testJson = require('../test.json');

// Mocked response
const axiosResponse: AxiosResponse = {
  data: testJson,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};

// axios mocked
export default {
  default: {
    get: jest.fn().mockImplementation(() => Promise.resolve(axiosResponse)),
  },
  get: jest.fn(() => Promise.resolve(axiosResponse)),
};