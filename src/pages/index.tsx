import { Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import ShowPosts from '../components/Posts/ShowPosts';
import { useAuth } from '../hooks/useAuth';
import { usePost } from '../hooks/usePost';
import { PostData } from '../types';

const Home = () => {
  const { loading } = useAuth();
  const { getAllPosts } = usePost();
  const [posts, setPosts] = useState<PostData[] | null>(null);

  useEffect(() => {
    let isSubscribed = true;

    getAllPosts(setPosts, isSubscribed);

    return () => {
      isSubscribed = false;
    };
  }, []);

  let body = null;

  if (loading) {
    body = (
      <Text align="center" size="xl">
        Loading...
      </Text>
    );
  } else if (posts === null) {
    body = (
      <Text align="center" size="xl">
        Loading posts...
      </Text>
    );
  } else {
    console.log('posts', posts);

    body = (
      <>
        <ShowPosts posts={posts} />
      </>
    );
  }

  return <Layout>{body}</Layout>;
};

export default Home;
