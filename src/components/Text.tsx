import { Typography } from '@material-ui/core';

export default function Text({ variant, fontWeight, content }) {
  return (
    <Typography variant={variant} style={{ fontWeight, fontFamily: 'roboto' }}>
      {content}
    </Typography>
  );
}
