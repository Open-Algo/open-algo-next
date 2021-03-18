import { Problem, User } from '../../types';

export default function isProblemSolved({
  problem,
  user,
}: {
  problem: Problem;
  user: User;
}) {
  if (!user.id) return false;

  const problemId = problem.id;
  const difficulty = problem.difficulty || 'easy';
  const group = problem.group.tag || 'Array';

  const isSolved =
    problemId in user.problemsByDifficulty[difficulty] ||
    problemId in user.problemsByGroup[group];

  return isSolved;
}
