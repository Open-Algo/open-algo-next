import { Problem, Problems } from '../../types';

export default function getCountProblems(problems: Problems) {
  let count = 0;

  Object.values(problems).forEach((problems: Problem[]) => {
    count += problems.length;
  });

  return count;
}
