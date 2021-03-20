import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { User, Problems } from '../../types';
import { getCountProblems, getCountSolvedProblems } from '../helpers';

export default function ProgressBar({
  user,
  problems,
}: {
  user: User;
  problems: Problems;
}) {
  const theme = useTheme();

  const numSolvedProblems = getCountSolvedProblems(user);
  const numProblems = getCountProblems(problems);

  const percentageSolved = Math.floor(100 * (numSolvedProblems / numProblems));

  return (
    <Box
      style={{
        width: '96vw',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.palette.info.main,
      }}
    >
      <Box
        style={{
          width: `${percentageSolved}%`,
          height: 40,
          backgroundColor: theme.palette.success.main,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
      ></Box>
      <Typography
        variant="caption"
        style={{
          fontWeight: 'bold',
          marginLeft: 10,
          color: theme.palette.secondary.main,
        }}
      >{`${percentageSolved}%`}</Typography>
    </Box>
  );
}
