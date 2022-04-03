import {
  Avatar,
  Box,
  Card,
  Center,
  Divider,
  Text,
  Title,
  UnstyledButton,
  Modal,
  createStyles,
} from '@mantine/core';
import { UserData } from '../../types';
import Layout from '../Layout/Layout';
import UserPosts from './UserPosts';
import moment from 'moment';
import { Edit } from 'tabler-icons-react';
import { ActionIcon } from '@mantine/core';
import { useState } from 'react';
import UsernameForm from './UsernameForm';
import AboutForm from './AboutForm';
import ContactsForm from './ContactsForm';
import UserContactsList from './UserContacts';

const useStyles = createStyles((theme) => ({
  username: {
    fontFamily: 'Hoeflers',
    fontWeight: 400,
  },
  card: {
    backgroundColor: '#fffff7',
  },
  contacts: {
    fontFamily: 'Delicious',
    fontWeight: 400,
  },
  about: {
    fontFamily: 'Rosebay',
    fontWeight: 700,
  },
}));

interface UserPageProps {
  user: UserData;
}

const UserPage: React.FC<UserPageProps> = ({ user }) => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const [openedContacts, setOpenedContacts] = useState(false);
  const [openedUsername, setOpenedUsername] = useState(false);
  const contacts = user.contacts;

  return (
    <Layout>
      <Card shadow="sm" p="lg" m={10} className={classes.card}>
        <Box style={{ maxWidth: 500, margin: 'auto' }}>
          <Center>
            <UnstyledButton>
              <Avatar
                src={user.photoUrl}
                alt={user.username}
                radius="xl"
                size="xl"
              />
            </UnstyledButton>
          </Center>
          <Center>
            <ActionIcon
              color="cyan"
              mr={8}
              onClick={() => setOpenedUsername(true)}
            >
              <Edit />
            </ActionIcon>
            <Title className={classes.username}>{user.username}</Title>
          </Center>
          <Center>
            <Text size="sm" style={{ lineHeight: 1.5 }} mb={8}>
              <Text weight={500} component="span" className={classes.username}>
                Joined on{' '}
              </Text>
              <Text component="span" className={classes.username}>
                {moment(new Date(user.joinedAt!)).format('LL')} 🕹
              </Text>
            </Text>
          </Center>

          <Divider my="xs" />
          <Center>
            <ActionIcon color="yellow" mr={8} onClick={() => setOpened(true)}>
              <Edit />
            </ActionIcon>
            <Text size="sm" style={{ lineHeight: 1.5 }}>
              <Text className={classes.about}>About 🖌️</Text>
            </Text>
          </Center>
          <Center>
            <Text
              size="sm"
              style={{ lineHeight: 1.5 }}
              my={8}
              mx={20}
              align="center"
            >
              <Text weight={400}>
                {user.about ? user.about : '404 not found'}
              </Text>
            </Text>
          </Center>

          <Divider my="xs" />
          <Center>
            <ActionIcon
              color="red"
              mr={8}
              onClick={() => setOpenedContacts(true)}
            >
              <Edit />
            </ActionIcon>
            <Text size="sm" style={{ lineHeight: 1.5 }}>
              <Text size="lg" component="span" className={classes.contacts}>
                Contacts ☎️
              </Text>
            </Text>
          </Center>
          <Center>
            {contacts.length > 0 ? (
              <Box mx={10} mt={8} mb={30}>
                <UserContactsList contacts={contacts} />
              </Box>
            ) : (
              <Text size="sm" style={{ lineHeight: 1.5 }} my={8} align="center">
                <Text>
                  Your list of contacts is empty! Please add your contacts, so
                  other users can see them.
                </Text>
              </Text>
            )}
          </Center>
        </Box>
      </Card>
      <UserPosts userId={user.id} />
      <Modal
        opened={openedUsername}
        onClose={() => setOpenedUsername(false)}
        title={<Title className={classes.username}>What is your name?</Title>}
        overlayColor={'#0e345b'}
        overlayOpacity={0.2}
        transition="rotate-right"
        transitionDuration={600}
        transitionTimingFunction="ease"
        radius={'xs'}
      >
        <UsernameForm user={user} />
      </Modal>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Title className={classes.about}>Tell us about yourself</Title>}
        overlayColor={'#ffff9d'}
        overlayOpacity={0.2}
        transition="rotate-left"
        transitionDuration={600}
        transitionTimingFunction="ease"
        radius={'xs'}
      >
        <AboutForm user={user} />
      </Modal>
      <Modal
        opened={openedContacts}
        onClose={() => setOpenedContacts(false)}
        title={
          <Title className={classes.contacts}>Give us your contacts</Title>
        }
        overlayColor={'#ff6138'}
        overlayOpacity={0.1}
        transition="rotate-right"
        transitionDuration={600}
        transitionTimingFunction="ease"
        radius={'xs'}
      >
        <ContactsForm user={user} />
      </Modal>
    </Layout>
  );
};

export default UserPage;
