import { Problem } from '../../types';

export default function hasExplanation({ problem }: { problem: Problem }) {
  return Boolean(problem.solutions[0].explanation);
}
