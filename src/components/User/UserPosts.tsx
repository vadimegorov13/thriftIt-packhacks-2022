import { Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import ShowPosts from '../Posts/ShowPosts';
import { usePost } from '../../hooks/usePost';
import { PostData } from '../../types';

interface UserPageProps {
  userId: string;
}

const UserPosts: React.FC<UserPageProps> = ({ userId }) => {
  const { getUserPosts } = usePost();
  const { loading } = useAuth();
  const [posts, setPosts] = useState<PostData[] | null>(null);

  useEffect(() => {
    let isSubscribed = true;

    if (userId) {
      getUserPosts(userId, setPosts, isSubscribed);
    }

    return () => {
      isSubscribed = false;
    };
  }, [userId]);

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
    body = <ShowPosts posts={posts} />;
  }

  return <>{body}</>;
};

export default UserPosts;
