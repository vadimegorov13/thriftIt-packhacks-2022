import { SimpleGrid } from '@mantine/core';
import { PostData } from '../../types';
import PostCard from './PostCard';

interface ShowPostsProps {
  posts: PostData[];
}

const ShowPosts: React.FC<ShowPostsProps> = ({ posts }) => {
  const body = (
    <SimpleGrid
      cols={3}
      spacing="lg"
      breakpoints={[
        { maxWidth: 1200, cols: 3, spacing: 'lg' },
        { maxWidth: 980, cols: 2, spacing: 'md' },
        { maxWidth: 755, cols: 1, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}
    >
      {posts.map((post: PostData) => {
        if (post.pictures.length > 0) {
          return (
            <div key={post.id}>
              <PostCard post={post} />
            </div>
          );
        } else {
          return null;
        }
      })}
    </SimpleGrid>
  );
  return <>{body}</>;
};

export default ShowPosts;
