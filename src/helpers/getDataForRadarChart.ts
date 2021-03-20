import theme from '../theme';
import { User } from '../../types';
import MAP_OF_PROBLEMS from '../../constants/counts/problems';
import PROBLEMS from '../../constants/labels/problems';

export default function getDataForRadarChart({ user }: { user: User }) {
  const dataForRadarChart = {
    labels: PROBLEMS,
    datasets: [
      {
        backgroundColor: theme.palette.success.main,
        borderColor: theme.palette.success.main,
        pointBackgroundColor: theme.palette.info.main,
        pointBorderColor: theme.palette.secondary.main,
        pointHoverBackgroundColor: theme.palette.secondary.light,
        pointHoverBorderColor: theme.palette.info.light,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };

  Object.entries(user.problemsByGroup)
    .sort()
    .forEach(([group, problems]: [string, { _total: number }], idx: number) => {
      const numSolvedProblems = problems._total;
      const numProblems = MAP_OF_PROBLEMS[group];
      dataForRadarChart.datasets[0].data[idx] = numSolvedProblems / numProblems;
    });

  return dataForRadarChart;
}
