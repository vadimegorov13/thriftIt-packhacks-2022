import { Box, Title } from '@mantine/core';
import { PostData } from '../../types';
import Layout from '../Layout/Layout';

interface ShowPostsProps {
  posts: PostData[];
}

const ShowPosts: React.FC<ShowPostsProps> = ({ posts }) => {
  const body = (
    <Box>
      {posts.map((post: PostData) => (
        <Box key={post.id}>
          <Title>{post.title}</Title>
        </Box>
      ))}
    </Box>
  );
  return <Layout>{body}</Layout>;
};

export default ShowPosts;
