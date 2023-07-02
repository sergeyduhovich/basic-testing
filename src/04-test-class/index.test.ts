import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 1000;
    const sut = getBankAccount(initialBalance);
    expect(sut.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const sut = getBankAccount(0);
    const sutOperation = () => sut.withdraw(100);

    expect(sutOperation).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const sut = getBankAccount(100);
    const recipient = getBankAccount(0);
    const sutOperation = () => sut.transfer(200, recipient);

    expect(sutOperation).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const sut = getBankAccount(100);
    const sutOperation = () => sut.transfer(200, sut);

    expect(sutOperation).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const sut = getBankAccount(0);
    sut.deposit(500);
    expect(sut.getBalance()).toEqual(500);
  });

  test('should withdraw money', () => {
    const sut = getBankAccount(1000);
    sut.withdraw(500);
    expect(sut.getBalance()).toEqual(500);
  });

  test('should transfer money', () => {
    const sut = getBankAccount(1000);
    const recipient = getBankAccount(0);
    sut.transfer(200, recipient);

    expect(recipient.getBalance()).toEqual(200);
    expect(sut.getBalance()).toEqual(800);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // TODO: random should be mocked to not fail
    const sut = getBankAccount(0);
    const result = await sut.fetchBalance();

    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // TODO: random should be mocked to not fail
    const sut = getBankAccount(0);
    await sut.synchronizeBalance();

    expect(sut.getBalance()).not.toEqual(0);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // TODO: random should be mocked to fail
    const sut = getBankAccount(0);
    const sutAction = async () => sut.synchronizeBalance();

    await expect(sutAction).toThrow(SynchronizationFailedError);
  });
});
