import { Request, Response } from 'express';
import CustomError from '../exceptions/error.exception';
import UserService from '../services/user.service';

class UserController {
  public static async auth(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError(400, 'All fields must be filled');
    }

    const token = await UserService.auth(email, password);

    return res.status(200).json({ token });
  }

  public static async userRole(req: Request, res: Response): Promise<Response> {
    const token = req.headers.authorization;

    if (!token) {
      throw new CustomError(404, 'Token not found');
    }

    const data = await UserService.userRole(token);

    return res.status(200).json({ role: data.role });
  }
}

export default UserController;
