import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  const consoleLogOriginal = console.log;

  beforeAll(() => {
    console.log = jest.fn();
  });

  afterAll(() => {
    jest.unmock('./index');
    console.log = consoleLogOriginal;
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(console.log).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();

    expect(console.log).toHaveBeenNthCalledWith(1, 'I am not mocked');
  });
});
