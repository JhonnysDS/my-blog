export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    avatar: string;
  }

export interface UserUpdate{
  username: string;
  email: string;
  avatar?: string;
}

export interface ChangePassword{
  old_password: any;
  new_password: any;
}