export default interface User {
  jwt: string;
  id: number;
  username: string;
  email: string;
  problems: {}[];
  problemsByDifficulty: {};
  problemsByGroup: {};
}
