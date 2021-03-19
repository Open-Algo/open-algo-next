import React from 'react';
import { useTheme } from '@material-ui/core/styles';

export default function CodeBlock({ value }) {
  const theme = useTheme();
  return (
    <code
      style={{
        display: 'inline',
        backgroundColor: theme.code.background,
        color: theme.code.text,
        padding: 3,
        borderRadius: 5,
        fontWeight: 'bold',
      }}
    >
      {value}
    </code>
  );
}
