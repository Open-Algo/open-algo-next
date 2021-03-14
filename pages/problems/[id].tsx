import React from 'react';
import { Box, Chip, Typography } from '@material-ui/core';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { Solution, Problem as ProblemInterface } from '../../types';
import styles from '../../styles/problem.module.scss';

export default function Problem({ problem }: { problem: ProblemInterface }) {
  const solutions = problem.solutions.map(
    (solution: Solution) => solution.solution
  );

  return (
    <Box>
      <Typography>{problem.name}</Typography>
      <Chip label={problem.group.tag} />

      <Box className={styles.solutionsBox}>
        {solutions.map((solution: string) => (
          <SyntaxHighlighter language="python" style={atomOneDark}>
            {solution}
          </SyntaxHighlighter>
        ))}
      </Box>
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
