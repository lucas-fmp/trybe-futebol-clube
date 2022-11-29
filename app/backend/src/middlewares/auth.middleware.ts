import { NextFunction, Request, Response } from 'express';
import CustomError from '../exceptions/error.exception';
import { validateToken } from '../utils/jwt.util';

const validateTokenMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new CustomError(401, 'Token is required');
  }

  validateToken(authorization);
  next();
};

export default validateTokenMiddleware;
