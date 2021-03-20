import Solution from './Solution';
import Group from './Group';
import Video from './Video';

export default interface Problem {
  id: string;
  difficulty: string;
  diagrams: string[];
  name: string;
  leetcode: string;
  group: Group;
  solutions: Solution[];
  description: string;
  videos: Video[];
}
