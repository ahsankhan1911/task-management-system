import { randomUUID } from 'crypto';

export class CryptoProvider {
  public static generateRandomId() {
    return randomUUID();
  }
}