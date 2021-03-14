export default interface Account {
  id: number;
  provider: string;
  type: string;
  refreshToken: string;
  accessToken: string;
  accessTokenExpires: string;
}
