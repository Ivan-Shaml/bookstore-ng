export interface JwtUserToken {
  alg: string,
  typ: string
  "email": string,
  "iat": number,
  "exp": number,
  "sub": string
}
