import { Text } from '@mantine/core';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import EditPostForm from '../../components/Posts/EditPostFor';
import { usePost } from '../../hooks/usePost';
import { useRequireAuth } from '../../hooks/useRequireAuth';
import { PostData } from '../../types';

const EditPost: NextPage<{ id: string }> = ({ id }) => {
  const [post, setPost] = useState<PostData | null>(null);
  const { loading } = useRequireAuth();
  const { getPost } = usePost();

  useEffect(() => {
    let isSubscribed = true;

    getPost(id, setPost, isSubscribed);
    console.log('id: ', id);
    console.log('post: ', post);

    return () => {
      isSubscribed = false;
    };
  }, []);

  let body;

  if (!post || loading) {
    body = (
      <Text align="center" size="xl">
        Loading...
      </Text>
    );
  } else {
    body = <EditPostForm post={post} />;
  }

  return <Layout>{body}</Layout>;
};

EditPost.getInitialProps = ({ query }) => {
  return {
    id: query.slug as string,
  };
};

export default EditPost;
