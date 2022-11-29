import { NextFunction, Request, Response } from 'express';
import CustomError from '../exceptions/error.exception';

const handleError = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Erro inesperado. Por favor, tente mais tarde';
  return res.status(status).json({ message });
};

export default handleError;
