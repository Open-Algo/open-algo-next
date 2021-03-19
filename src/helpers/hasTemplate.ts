import { Problem } from '../../types';

export default function hasTemplate({ problem }: { problem: Problem }) {
  return Boolean(problem.solutions[0].templates.length > 0);
}
