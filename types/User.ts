export default interface User {
  jwt: string;
  id: string;
  username: string;
  email: string;
  problems: {}[];
  problemsByDifficulty: {};
  problemsByGroup: {};
}
