export interface IUserWithoutPassword {
  id: number,
  username: string;
  role: string;
  email: string;
}

export interface IUser extends IUserWithoutPassword {
  password: string
}
