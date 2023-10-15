import { JWTAuthProvider } from 'app/providers';
import { Response, NextFunction } from 'express';
import { accessForbiddenErrorHandler, unauthorizedErrorHandler } from './response-handler';

export const authenticateUser = (req: any, res: Response, next: NextFunction) => {
  const authToken = req.header('Authorization')?.replace('Bearer ', '');

  if (!authToken) {
    return res.status(401).send(unauthorizedErrorHandler('No Authorization header!'));
  }

  try {
    const verified = JWTAuthProvider.verifyAccessToken(authToken);
    req.user = verified.payload;
  } catch (e) {
    console.log(e);

    return res.status(403).send(accessForbiddenErrorHandler('Invalid auth'));
  }

  return next();
};