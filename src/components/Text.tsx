import React from 'react';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export default function Text({ value }) {
  return (
    <Typography
      variant="body1"
      style={{ fontFamily: 'roboto', display: 'inline' }}
    >
      {value}
    </Typography>
  );
}
