export interface User {
  "id": number,
  "email": string,
  "name": string,
  "phone": string,
  "role": Role,
}

export type Role = "admin" | "user";

export interface UserForRegistration {
  "email": string,
  "name": string,
  "phone": string,
  "password": string,
}

export interface UserForLogin {
  "email": string,
  "password": string,
}

export interface UserAuthResponse {
  accessToken: string;
  user: User;
}
