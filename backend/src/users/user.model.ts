export class User {
    id: string;
    email: string;
    password: string;
    isLoggedIn: boolean;
}

export class LoginDto {
  email: string;
  password: string;
}
