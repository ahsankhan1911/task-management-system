import { Request, Response } from 'express';

import { User, UserAuth } from 'app/models';
import { BcryptProvider, DataStore, JWTAuthProvider } from 'app/providers';
import { successHandler, notFoundHandler, unauthorizedErrorHandler } from 'app/middlewares';

/**
 * @name registerUser
 * @description registers a user
 * @route /user/register
 * @method POST
 */
export const registerUser = (req: Request<any, any, User>, res: Response) => {
  const passwordHash = BcryptProvider.generatePasswordHash(req.body.password);
  const { id, username } = DataStore.insert<User>(User, { ...req.body, password: passwordHash });

  return res.status(200).json(successHandler({ id, username }));
};

/**
 * @name loginUser
 * @description log in a user
 * @route /user/login
 * @method POST
 */
export const loginUser = (req: Request<any, any, User>, res: Response) => {
  const { username, password } = req.body;
  const user = DataStore.find(User, { username });

  if (!user) {
    return res.status(404).json(notFoundHandler('No user found'));
  }

  const isPasswordCorrect = BcryptProvider.verifyPasswordHash(password, user.password);

  if (isPasswordCorrect) {
    const jwtPayload = { userId: user.id };

    const auth = new UserAuth();
    auth.token = JWTAuthProvider.generateAccessToken(jwtPayload);
    
    return res.status(200).json(successHandler(auth));
  }

  return res.status(200).json(unauthorizedErrorHandler('Incorrect password'));
};