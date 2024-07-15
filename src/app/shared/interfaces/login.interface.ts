export interface ILogin {
  user: string,
  clientNonce: string,
  systemNonce: string,
  passwordEncrypted: string
}