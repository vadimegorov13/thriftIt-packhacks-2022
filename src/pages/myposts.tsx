import { Box, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import ShowPosts from '../components/Posts/ShowPosts';
import { usePost } from '../hooks/usePost';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { PostData } from '../types';

const MyPosts = () => {
  const { user, loading } = useRequireAuth();
  const { getUserPosts } = usePost();
  const [myPosts, setMyPosts] = useState<PostData[] | null>(null);

  useEffect(() => {
    let isSubscribed = true;

    if (user) {
      getUserPosts(user!.id, setMyPosts, isSubscribed);
    }

    return () => {
      isSubscribed = false;
    };
  }, [user]);

  let body = null;

  if (loading) {
    body = (
      <Text align="center" size="xl">
        Loading...
      </Text>
    );
  } else if (myPosts === null) {
    body = (
      <Text align="center" size="xl">
        Loading posts...
      </Text>
    );
  } else {
    console.log('myPosts', myPosts);

    body = (
      <Box>
        <ShowPosts posts={myPosts} />
      </Box>
    );
  }

  return <Layout>{body}</Layout>;
};

export default MyPosts;
