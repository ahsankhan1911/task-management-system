import { hashSync, compareSync } from 'bcrypt';

export class BcryptProvider {
  public static generatePasswordHash(password: string) {
    return hashSync(password, 10);
  }

  public static verifyPasswordHash(password: string, hash: string) {
    return compareSync(password, hash);
  }
}