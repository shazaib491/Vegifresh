export interface Signin {
  email?: string;
  password?: string;
}

export interface Signup {
  email?: string;
  mobile: string;
  password?: string;
  repeat_password?: string;
}
