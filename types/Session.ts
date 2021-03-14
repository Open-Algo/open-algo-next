export default interface Session {
  jwt: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
  id: number;
  expires: string;
}
