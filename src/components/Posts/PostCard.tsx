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
    fontFamily: 'Hornbill',
    fontWeight: 700,
    color: '#0e345b',
    outlineColor: 'black',
  },
  card: {
    backgroundColor: '#fffff7',
  },
  modal: {
    color: '#fffff7',
  },
  contact: {
    backgroundColor: '#00a388',
    color: '#ffff9d',

    '&:hover': {
      backgroundColor: '#00d6b3',
    },
  },
  tabs: {
    color: '#ff6138',
    // '&:focus': {
    //   color: '#0e345b',
    // },
  },
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
      <Card shadow="sm" p="lg" m={2} className={classes.card} radius="xs">
        <Group position="apart">
          <Title order={3} className={classes.title}>
            {post.title}
          </Title>
        </Group>
        <Text size="xs" style={{ color: 'GrayText', lineHeight: 1.5 }}>
          {[...Array(post.quality)].map((e, i) => (
            <span key={i} style={{ color: '#9b870c' }}>
              📀
            </span>
          ))}
          {[...Array(10 - post.quality)].map((e, i) => (
            <span key={i} style={{ color: '#9b870c' }}>
              💿︎
            </span>
          ))}
        </Text>
        <Card.Section>
          <Tabs>
            {pictures.map((picture, index) => (
              <Tabs.Tab
                title={`${index + 1}`}
                icon={<Album />}
                key={picture}
                className={classes.tabs}
                color="teal"
              >
                <Image src={picture} height={250} alt="image" />
              </Tabs.Tab>
            ))}
          </Tabs>
        </Card.Section>

        <Group m={8}>
          {post.tags.map((tag, index) => (
            <div key={tag.tag}>
              <Badge
                style={{
                  backgroundColor:
                    index + (1 % 1) === 0
                      ? '#00a388'
                      : index++ % 2 === 0
                      ? '#ff6138'
                      : '#0e345b',
                  color:
                    index + (1 % 1) === 0
                      ? '#ffff9d'
                      : index + (1 % 2) === 0
                      ? '#ffff9d'
                      : '#ffff9d',
                }}
              >
                {tag.tag}
              </Badge>
            </div>
          ))}
        </Group>

        <Text size="sm" style={{ color: 'GrayText', lineHeight: 1.5 }} mb={8}>
          <Text weight={500}>Reason:</Text>
          <ScrollArea style={{ maxHeight: 150 }} offsetScrollbars>
            {post.reason}
          </ScrollArea>
        </Text>

        <Text size="sm" style={{ color: 'GrayText', lineHeight: 1.5 }} mb={8}>
          <Text weight={500}>Description:</Text>
          <ScrollArea style={{ maxHeight: 150 }} offsetScrollbars>
            {post.description}
          </ScrollArea>
        </Text>

        <Group position="apart">
          <ActionButtons owner={owner} postId={post.id} />
          <Group position="right">
            <Button
              variant="light"
              style={{
                marginTop: 10,
              }}
              className={classes.contact}
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
          className={classes.modal}
          overlayColor={'#ffff9d'}
          overlayOpacity={0.2}
          transition="fade"
          transitionDuration={600}
          transitionTimingFunction="ease"
          radius={'xs'}
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
