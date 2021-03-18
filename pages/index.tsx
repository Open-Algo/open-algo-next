import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { Box } from '@material-ui/core';
import RadarChart from '../src/components/RadarChart';

import { useUser } from '../src/context/UserContext';

export default function Home({ session }) {
  const { state } = useUser();

  return (
    <Box
      style={{
        height: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box style={{ width: 650, height: 650 }}>
        <RadarChart user={state.user} />
      </Box>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  return {
    props: {
      session,
    },
  };
};
