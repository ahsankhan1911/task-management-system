import { ok } from 'assert';

import { ENV, Environment } from './environtment';

interface JWTConfig {
  secret: string;
  expiry: string;
}

const config: { [key: string]: JWTConfig } = {
  [Environment.Test]: {
    secret: 'MIIEowIBAAKCAQEA0eMjnXMC',
    expiry: '10 days',
  },
  [Environment.Development]: {
    secret: 'MIIEowIBAAKCAQEA0eMjnXMC',
    expiry: '10 days',
  },

  [Environment.Local]: {
    secret: 'MIIEowIBAAKCAQEA0eMjnXMC',
    expiry: '10 days',
  },
  [Environment.Production]: {
    secret: process.env.JWT_SECRET || 'MIIEowIBAAKCAQEA0eMjnXMC',
    expiry: process.env.JWT_EXPIRY || '10 days',
  },
};

export const jwt = config[ENV] as JWTConfig;

//
// Make sure jwt secret and expiry are not an empty string
//
ok(jwt?.secret, 'JWT secret is not provided');
ok(jwt?.expiry, 'JWT expiry not provided');
