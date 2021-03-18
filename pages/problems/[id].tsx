import React, { useContext, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Chip,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { useMutation, gql } from '@apollo/client';
import {
  faExternalLinkAlt,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from '@material-ui/core/styles';

import { useUser } from '../../src/context/UserContext';

import SolutionPanel from '../../src/components/SolutionPanel';
import { User, Solution, Problem as ProblemInterface } from '../../types';
import TabPanel from '../../src/components/TabPanel';
import { isProblemSolved, toTitleCase } from '../../src/helpers';
import styles from '../../styles/problem.module.scss';

const ADD_PROBLEM = gql`
  mutation addProblem($email: String!, $problemId: ID!) {
    addProblem(email: $email, problemId: $problemId) {
      id
      email
      username
      problems {
        id
      }
      problemsByDifficulty
      problemsByGroup
    }
  }
`;

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Problem({ problem }: { problem: ProblemInterface }) {
  const theme = useTheme();

  const [value, setValue] = useState(0);

  const { state, dispatch } = useUser();

  const [addProblem] = useMutation<{ addProblem: User }>(ADD_PROBLEM, {
    onCompleted({ addProblem }) {
      const user = addProblem;
      dispatch({ type: 'update', user });
    },
  });

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleAddProblem = () => {
    if (state.user.id) {
      addProblem({
        variables: { email: state.user.email, problemId: problem.id },
      });
    }
  };

  return (
    <Box className={styles['root']}>
      <Box style={{ margin: 15 }}>
        <Box style={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            variant="h3"
            style={{ color: '#fff', fontWeight: 'bold' }}
          >
            {problem.name}
          </Typography>

          <Button href={problem.leetcode}>
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              size="lg"
              style={{ color: '#1B91DA' }}
            />
          </Button>

          <Button onClick={handleAddProblem}>
            <FontAwesomeIcon
              icon={faCheckCircle}
              size="lg"
              style={{
                color: isProblemSolved({ user: state.user, problem })
                  ? '#3CD75F'
                  : theme.palette.info.light,
              }}
            />
          </Button>
        </Box>

        <Chip
          label={problem.group ? problem.group.tag : 'Other'}
          style={{ backgroundColor: '#1B91DA', margin: 2 }}
        />

        <Chip
          label={problem.difficulty ? toTitleCase(problem.difficulty) : 'Other'}
          style={{ backgroundColor: '#1B91DA', margin: 2 }}
        />
      </Box>

      <AppBar
        position="static"
        style={{
          backgroundColor: theme.palette.background.default,
          boxShadow: 'none',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { background: '#1B91DA' } }}
        >
          {problem.solutions.map((solution: Solution, idx: number) => (
            <Tab
              label={
                <Typography style={{ color: '#1B91DA', fontWeight: 'bold' }}>
                  {solution.title}
                </Typography>
              }
              {...a11yProps(idx)}
            />
          ))}
        </Tabs>
      </AppBar>

      {problem.solutions.map((solution, idx) => (
        <TabPanel value={value} index={idx}>
          <SolutionPanel solution={solution} />
        </TabPanel>
      ))}
    </Box>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.API_URL}/problems`);
  const problems = await res.json();

  const paths = problems.map((problem: ProblemInterface) => ({
    params: { id: problem.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.API_URL}/problems/${params.id}`);
  const problem = await res.json();
  return { props: { problem } };
}
