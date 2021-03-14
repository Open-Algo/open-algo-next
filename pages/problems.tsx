import React from 'react';
import { Box, Chip, Paper, Typography } from '@material-ui/core';
import Link from 'next/link';
import axios from 'axios';
import styles from '../styles/Problems.module.scss';
import { Problem } from '../types';

export default function Problems({ problems }) {
  return (
    <Box className={styles.root}>
      <Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            overflowX: 'auto',
            padding: 20,
          }}
        >
          {Object.entries(problems)
            .filter(
              ([type, problems]: [string, Problem[]]) => problems.length > 0
            )
            .map(([type, problems]: [string, Problem[]]) => (
              <Paper style={{ margin: 5, padding: 20 }}>
                <Typography variant="h6">{type}</Typography>
                {problems.map((problem) => (
                  <Paper style={{ margin: 5, padding: 5, width: 150 }}>
                    <Link href={`/problems/${problem.id}`}>
                      <a style={{ textDecoration: 'none' }}>
                        <Typography
                          variant="body2"
                          className={styles.problemName}
                        >
                          {problem.name}
                        </Typography>
                      </a>
                    </Link>
                  </Paper>
                ))}
              </Paper>
            ))}
        </Box>
      </Box>
    </Box>
  );
}

async function fetchProblems() {
  const data = await axios.get(`${process.env.API_URL}/problems`);
  return data.data;
}

export async function getStaticProps() {
  const data = await fetchProblems();

  const problems = {
    Array: [],
    Binary: [],
    'Binary Search': [],
    'Binary Search Tree': [],
    'Binary Tree': [],
    'Dynamic Programming': [],
    Graph: [],
    Heap: [],
    Interval: [],
    'Linked List': [],
    Matrix: [],
    Stack: [],
    String: [],
    Trie: [],
  };

  for (const problem of data) {
    if (problem.group) {
      problems[problem.group.tag].push(problem);
    }
  }

  return {
    props: {
      problems,
    },
  };
}
