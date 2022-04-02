import { Box, Text } from '@mantine/core';
import Layout from '../components/Layout/Layout';
import SignInComponent from '../components/SignInComponent';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { user, loading } = useAuth();

  let body = null;

  if (loading) {
    body = (
      <Text align="center" size="xl">
        Loading...
      </Text>
    );
  } else if (!user) {
    body = <SignInComponent />;
    // body=null
  } else {
    body = (
      <Box>
        <Box my={'2rem'}>Hello {user.username}</Box>
      </Box>
    );
  }

  return <Layout>{body}</Layout>;
};

export default Home;
