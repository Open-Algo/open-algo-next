import { Problem } from '../../types';

export default function hasSolution({ problem }: { problem: Problem }) {
  return Boolean(problem.solutions[0].solution);
}
