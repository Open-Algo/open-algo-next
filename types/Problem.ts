import Solution from './Solution';
import Group from './Group';

export default interface Problem {
  id: string;
  difficulty: string;
  diagrams: string[];
  name: string;
  leetcode: string;
  group: Group;
  solutions: Solution[];
}
