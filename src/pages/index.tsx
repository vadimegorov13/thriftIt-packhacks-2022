import { Box, Text } from '@mantine/core';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { loading } = useAuth();

  let body = null;

  if (loading) {
    body = (
      <Text align="center" size="xl">
        Loading...
      </Text>
    );
  } else {
    body = (
      <Box>
        <Box my={'2rem'}>Hello World</Box>
      </Box>
    );
  }

  return <Layout>{body}</Layout>;
};

export default Home;
