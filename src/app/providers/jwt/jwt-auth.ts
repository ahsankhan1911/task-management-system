import jwt from 'jsonwebtoken';

import { jwt as config } from 'config';

export class JWTAuthProvider {
  public static generateAccessToken(payload: any) {
    return jwt.sign(payload, config.secret, { expiresIn: config.expiry });
  }

  public static decodeAccessToken(token: string) {
    return jwt.decode(token, { complete: true });
  }

  public static verifyAccessToken(token: string) {
    return jwt.verify(token, config.secret, { complete: true });
  }
}