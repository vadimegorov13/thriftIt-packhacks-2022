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
  Modal,
  Tabs,
  createStyles,
} from '@mantine/core';
import { PostData, UserData } from '../../types';
import { doc, getFirestore } from 'firebase/firestore';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { app } from '../../firebase/firebase';
import PostOwner from './PostOwner';
import ActionButtons from './ActionButtons';
import { useState } from 'react';
import UserContactsList from '../User/UserContacts';
import { Album } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  title: {
  },
  card: {
  }
}));

interface PostCardProps {
  post: PostData;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { classes } = useStyles();
  const [authorData, authorDataLoading] = useDocumentOnce(
    doc(getFirestore(app), 'users', `${post.ownerId}`)
  );
  const [opened, setOpened] = useState(false);

  let body;

  if (authorDataLoading) {
    body = (
      <Text align="center" size="xl">
        Loading...
      </Text>
    );
  } else {
    const owner = authorData?.data() as UserData;
    const pictures = post.pictures;

    body = (
      <Card shadow="sm" p="lg" m={2} className={classes.card}>
        <Group position="apart" style={{ marginBottom: 5 }}>
          <Title order={3} className={classes.title}>
            {post.title}
          </Title>
        </Group>
        <Card.Section>
          <Tabs>
            {pictures.map((picture, index) => (
              <Tabs.Tab title={`${index + 1}`} icon={<Album />} key={picture}>
                <Image src={picture} height={300} alt="image" />
              </Tabs.Tab>
            ))}
          </Tabs>
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
          <ActionButtons owner={owner} postId={post.id} />
          <Group position="right">
            <Button
              variant="light"
              color="pink"
              style={{ marginTop: 10 }}
              onClick={() => setOpened(true)}
            >
              Contact
            </Button>
          </Group>
        </Group>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          // eslint-disable-next-line react/no-unescaped-entities
          title={<PostOwner owner={owner} />}
        >
          <UserContactsList contacts={owner.contacts} />
        </Modal>
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
