import { User } from '../../types';

export default function getNumSolvedProblems(user: User) {
  return user.problems.length;
}
