import _ from 'lodash';

import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

const BALANCE = 1;

describe('BankAccount', () => {
  let account: ReturnType<typeof getBankAccount>;

  beforeEach((): void => {
    account = getBankAccount(BALANCE);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(BALANCE + 1)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const newAccount = getBankAccount(BALANCE);
    const amountToTransfer = BALANCE + 1;
    expect(() => account.transfer(amountToTransfer, newAccount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(BALANCE, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    account.deposit(BALANCE);
    expect(account.getBalance()).toBe(BALANCE + BALANCE);
  });

  test('should withdraw money', () => {
    account.withdraw(BALANCE);
    expect(account.getBalance()).toBe(BALANCE - BALANCE);
  });

  test('should transfer money', () => {
    const newAccount = getBankAccount(BALANCE);
    account.transfer(BALANCE, newAccount);

    expect(account.getBalance()).toBe(BALANCE - BALANCE);
    expect(newAccount.getBalance()).toBe(BALANCE + BALANCE);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(_, 'random').mockImplementation(() => BALANCE);

    const balance = await account.fetchBalance();

    expect(typeof balance).toBe('number');
    expect(balance).toBe(BALANCE);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest
      .spyOn(BankAccount.prototype, 'fetchBalance')
      .mockImplementation(() => Promise.resolve(BALANCE));

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(BALANCE);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest
      .spyOn(BankAccount.prototype, 'fetchBalance')
      .mockImplementation(() => Promise.resolve(null));

    expect.assertions(1);

    try {
      await account.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
