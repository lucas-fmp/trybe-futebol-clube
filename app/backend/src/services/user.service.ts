import bcrypt from 'bcryptjs';
import { JwtPayload, verify } from 'jsonwebtoken';
import CustomError from '../exceptions/error.exception';
import { generateToken } from '../utils/jwt.util';
import User from '../database/models/UserModel';

export default class UserService {
  public static async auth(email: string, password: string) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new CustomError(401, 'Incorrect email or password');
    }

    const verifyingPassword = bcrypt.compareSync(password, user.dataValues.password);

    if (!verifyingPassword) {
      throw new CustomError(401, 'Incorrect email or password');
    }

    const { password: _, ...userWithoutPassword } = user.dataValues;

    const token = generateToken(userWithoutPassword);

    return token;
  }

  public static async userRole(token: string) {
    const { data } = verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    return data;
  }
}
