import * as jwt from 'jsonwebtoken';
import CustomError from '../exceptions/error.exception';
import { IUserWithoutPassword } from '../interfaces/IUser';

const generateToken = (data: IUserWithoutPassword) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET as string, { algorithm: 'HS256' });

  return token;
};

const validateToken = (token: string) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (_e) {
    throw new CustomError(401, 'Expired or invalid token');
  }
};

export { generateToken, validateToken };
