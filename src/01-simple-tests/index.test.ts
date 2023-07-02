// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 7, b: 6, action: Action.Add });
    expect(result).toBe(13);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 7, b: 6, action: Action.Subtract });
    expect(result).toBe(1);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 7, b: 6, action: Action.Multiply });
    expect(result).toBe(42);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 12, b: 6, action: Action.Divide });
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 10,
      action: Action.Exponentiate,
    });
    expect(result).toBe(1024);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 12, b: 6, action: 'InvalidAction' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 'invalid',
      b: 'argument',
      action: Action.Add,
    });
    expect(result).toBeNull();
  });
});
