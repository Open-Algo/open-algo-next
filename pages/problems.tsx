import React from 'react';
import { Box, Paper, Tooltip, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Link from 'next/link';
import axios from 'axios';
import { useUser } from '../src/context/UserContext';
import {
  isProblemSolved,
  hasExplanation,
  hasSolution,
  hasTemplate,
  hasVideo,
  hasDiagram,
} from '../src/helpers';
import {
  faCheckCircle,
  faBookOpen,
  faShapes,
  faChalkboard,
  faProjectDiagram,
} from '@fortawesome/free-solid-svg-icons';

import { faPython, faYoutube } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProgressBar from '../src/components/ProgressBar';
import { Problem } from '../types';
import styles from '../styles/problems.module.scss';

export default function Problems({ problems }) {
  const theme = useTheme();
  const { state } = useUser();

  return (
    <Box className={styles.root}>
      <Box>
        <Box style={{ paddingLeft: 25, margin: 5, paddingTop: 10 }}>
          <ProgressBar user={state.user} problems={problems} />
        </Box>
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
              <Paper
                style={{
                  margin: 5,
                  padding: 20,
                  backgroundColor: theme.palette.info.main,
                }}
              >
                <Box
                  style={{
                    backgroundColor: theme.palette.info.light,
                    marginBottom: 10,
                    padding: 5,
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontFamily: 'roboto',
                      color: theme.palette.secondary.main,
                    }}
                  >
                    {type}
                  </Typography>
                </Box>
                {problems.map((problem) => (
                  <Paper
                    style={{
                      margin: 5,
                      padding: 7,
                      width: 220,
                      backgroundColor: theme.palette.background.default,
                    }}
                  >
                    <Link href={`/problems/${problem.id}`}>
                      <a
                        style={{
                          textDecoration: 'none',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Box
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            style={{
                              color: isProblemSolved({
                                user: state.user,
                                problem,
                              })
                                ? theme.palette.success.main
                                : theme.palette.info.light,
                              marginRight: 5,
                            }}
                          />

                          <Typography
                            variant="body2"
                            className={styles.problemName}
                            style={{
                              color: theme.palette.secondary.light,
                              fontFamily: 'roboto',
                              fontWeight: 'bold',
                            }}
                          >
                            {problem.name}
                          </Typography>
                        </Box>

                        <Box
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                          }}
                        >
                          {hasSolution({ problem }) ? (
                            <Tooltip
                              title="Has Solution"
                              style={{
                                display: 'inline',
                              }}
                            >
                              <Box>
                                <FontAwesomeIcon
                                  icon={faPython}
                                  style={{
                                    color: theme.solution.solution.main,
                                    margin: 2,
                                  }}
                                />
                              </Box>
                            </Tooltip>
                          ) : null}

                          {hasExplanation({ problem }) ? (
                            <Tooltip
                              title="Has Explanation"
                              style={{
                                display: 'inline',
                              }}
                            >
                              <Box>
                                <FontAwesomeIcon
                                  icon={faBookOpen}
                                  style={{
                                    color: theme.solution.explanation.main,
                                    margin: 2,
                                  }}
                                />
                              </Box>
                            </Tooltip>
                          ) : null}

                          {hasTemplate({ problem }) ? (
                            <Tooltip
                              title="Has Template"
                              style={{
                                display: 'inline',
                              }}
                            >
                              <Box>
                                <FontAwesomeIcon
                                  icon={faShapes}
                                  style={{
                                    color: theme.solution.template.main,
                                    margin: 2,
                                  }}
                                />
                              </Box>
                            </Tooltip>
                          ) : null}

                          {hasVideo({ problem }) ? (
                            <Tooltip
                              title="Has Video"
                              style={{
                                display: 'inline',
                              }}
                            >
                              <Box>
                                <FontAwesomeIcon
                                  icon={faYoutube}
                                  style={{
                                    color: theme.palette.error.main,
                                    margin: 2,
                                  }}
                                />
                              </Box>
                            </Tooltip>
                          ) : null}

                          {hasDiagram({ problem }) ? (
                            <Tooltip
                              title="Has Diagram"
                              style={{
                                display: 'inline',
                              }}
                            >
                              <Box>
                                <FontAwesomeIcon
                                  icon={faProjectDiagram}
                                  style={{
                                    color: '#cfd3d7',
                                    margin: 2,
                                  }}
                                />
                              </Box>
                            </Tooltip>
                          ) : null}
                        </Box>
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
    'Hash Table': [],
    Heap: [],
    Interval: [],
    'Linked List': [],
    Matrix: [],
    Stack: [],
    String: [],
    Tree: [],
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
    revalidate: 1,
  };
}
