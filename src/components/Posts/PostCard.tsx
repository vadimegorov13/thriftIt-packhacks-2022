import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Title,
  ScrollArea,
  Center,
  Box,
} from '@mantine/core';
import { PostData, UserData } from '../../types';
import { doc, getFirestore } from 'firebase/firestore';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { app } from '../../firebase/firebase';
import PostOwner from './PostOwner';
import ActionButtons from './ActionButtons';

interface PostCardProps {
  post: PostData;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [authorData, authorDataLoading] = useDocumentOnce(
    doc(getFirestore(app), 'users', `${post.ownerId}`)
  );

  let body;

  if (authorDataLoading) {
    body = (
      <Text align="center" size="xl">
        Loading...
      </Text>
    );
  } else {
    body = (
      <Card shadow="sm" p="lg" m={2}>
        <Group position="apart" style={{ marginBottom: 5 }}>
          <Title order={3}>{post.title}</Title>
          <ActionButtons
            owner={authorData?.data() as UserData}
            postId={post.id}
          />
        </Group>
        <Card.Section>
          <Image
            src="https://yt3.ggpht.com/IhrkWQ9jdq0-NqX6tuMIkzia560fo_jTg9qWYy223eGIDu3ZcJPRkl1hgY2ZuxLTvRyAdjRd0w=s900-c-k-c0x00ffffff-no-rj"
            height={400}
            alt="ame"
          />
        </Card.Section>

        <Group m={8}>
          {post.tags.map((tag) => (
            <div key={tag.tag}>
              <Badge color="pink" variant="light">
                {tag.tag}
              </Badge>
            </div>
          ))}
        </Group>

        <Text size="sm" style={{ color: 'GrayText', lineHeight: 1.5 }} mb={8}>
          <Text weight={500}>Description:</Text>
          <ScrollArea style={{ maxHeight: 150 }} offsetScrollbars>
            {post.description}
          </ScrollArea>
        </Text>

        <Text size="sm" style={{ color: 'GrayText', lineHeight: 1.5 }} mb={8}>
          <Text weight={500}>Reason:</Text>
          <ScrollArea style={{ maxHeight: 150 }} offsetScrollbars>
            {post.reason}
          </ScrollArea>
        </Text>

        <Text size="sm" style={{ color: 'GrayText', lineHeight: 1.5 }}>
          <Text weight={500}>Quality:</Text>
          {post.quality}/10
        </Text>

        <Group position="apart">
          <PostOwner owner={authorData?.data() as UserData} />
          <Group position="right">
            <Button variant="light" color="pink" style={{ marginTop: 10 }}>
              Contact
            </Button>
          </Group>
        </Group>
      </Card>
    );
  }

  return (
    <Center m={8}>
      <Box style={{ maxWidth: 400, width: 400 }}>{body}</Box>
    </Center>
  );
};

export default PostCard;
