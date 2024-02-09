import { generateLinkedList } from './index';

const ARRAY = [1, 2, 3];
const TEST_LIST = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: null,
        next: null,
      },
    },
  },
};

const SNAPSHOT = `
{
  "next": {
    "next": {
      "next": {
        "next": null,
        "value": null,
      },
      "value": 3,
    },
    "value": 2,
  },
  "value": 1,
}
`;

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(ARRAY)).toStrictEqual(TEST_LIST);
  });

  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(ARRAY)).toMatchInlineSnapshot(SNAPSHOT);
  });
});
