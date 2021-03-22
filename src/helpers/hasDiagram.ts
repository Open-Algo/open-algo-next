import { Problem } from '../../types';

export default function hasDiagram({ problem }: { problem: Problem }) {
  return Boolean(
    problem.solutions &&
      problem.solutions.some((solution) => solution.diagrams.length > 0)
  );
}
