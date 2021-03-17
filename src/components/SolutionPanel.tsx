import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Chip,
  Paper,
  Typography,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  atomOneDark,
  atomOneLight,
} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import tagIds from '../../constants/tagIds';
import timeComplexityIds from '../../constants/timeComplexityIds';
import spaceComplexityIds from '../../constants/spaceComplexityIds';
import { Solution, Tag } from '../../types';

export default function SolutionPanel({ solution }: { solution: Solution }) {
  const handleLearnClick = (tag: string) => (e: React.ChangeEvent) => {
    console.log(tag);
  };

  const theme = useTheme();

  return (
    <Box>
      <Accordion
        style={{ backgroundColor: theme.palette.info.main }}
        defaultExpanded={true}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            variant="body1"
            style={{ fontWeight: 'bold', color: theme.palette.secondary.main }}
          >
            Approach
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{solution.explanation || 'To Do'}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        style={{ backgroundColor: theme.palette.info.main }}
        defaultExpanded={true}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            variant="body1"
            style={{ fontWeight: 'bold', color: theme.palette.secondary.main }}
          >
            Analysis
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box style={{ display: 'flex', flexDirection: 'row' }}>
            <Box style={{ margin: 2 }}>
              <Typography variant="body2" style={{ fontStyle: 'italic' }}>
                Time
              </Typography>
              <Chip
                label={timeComplexityIds[solution.time_complexity]}
                style={{ backgroundColor: theme.palette.info.light }}
              />
            </Box>
            <Box style={{ margin: 2 }}>
              <Typography variant="body2" style={{ fontStyle: 'italic' }}>
                Space
              </Typography>
              <Chip
                label={spaceComplexityIds[solution.space_complexity]}
                style={{ backgroundColor: theme.palette.info.light }}
              />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ backgroundColor: theme.palette.info.main }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            variant="body1"
            style={{ fontWeight: 'bold', color: theme.palette.secondary.main }}
          >
            Code
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SyntaxHighlighter language="python" style={atomOneLight}>
            {solution.solution || 'TODO'}
          </SyntaxHighlighter>{' '}
        </AccordionDetails>
      </Accordion>

      <Accordion
        style={{ backgroundColor: theme.palette.info.main }}
        defaultExpanded={true}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            variant="body1"
            style={{ fontWeight: 'bold', color: theme.palette.secondary.main }}
          >
            Learn
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            {solution.tags.map((tag: string) => (
              <Chip
                label={
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    {`#${tagIds[tag]}` || '#Other'}
                  </Typography>
                }
                onClick={() => handleLearnClick(tag)}
                style={{
                  backgroundColor: 'transparent',
                  color: '#1B91DA',
                  fontWeight: 'bold',
                }}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
