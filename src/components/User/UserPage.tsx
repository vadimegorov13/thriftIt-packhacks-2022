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

interface UserPageProps {
  user: UserData;
}

const UserPage: React.FC<UserPageProps> = ({ user }) => {
  const [opened, setOpened] = useState(false);
  const [openedContacts, setOpenedContacts] = useState(false);
  const [openedUsername, setOpenedUsername] = useState(false);
  const contacts = user.contacts;

  return (
    <Layout>
      <Card shadow="sm" p="lg" m={10}>
        <Box style={{ maxWidth: '400px', margin: 'auto' }}>
          <Center>
            <UnstyledButton>
              <Avatar
                src={user.photoUrl}
                alt={user.username}
                radius="xl"
                size="lg"
              />
            </UnstyledButton>
          </Center>
          <Center>
            <ActionIcon
              variant="filled"
              color="blue"
              mr={8}
              onClick={() => setOpenedUsername(true)}
            >
              <Edit />
            </ActionIcon>
            <Title>{user.username}</Title>
          </Center>

          <Divider my="xs" />

          <Center>
            <ActionIcon
              variant="filled"
              color="blue"
              mr={8}
              onClick={() => setOpened(true)}
            >
              <Edit />
            </ActionIcon>
            <Text size="sm" style={{ lineHeight: 1.5 }}>
              <Text weight={500}>About:</Text>
            </Text>
          </Center>
          <Center>
            <Text size="sm" style={{ lineHeight: 1.5 }} mb={8}>
              <Text>{user.about ? user.about : '404 not found'}</Text>
            </Text>
          </Center>
          <Divider my="xs" />
          <Center>
            <Text size="sm" style={{ lineHeight: 1.5 }} mb={8}>
              <Text weight={500} component="span">
                Joined on{' '}
              </Text>
              <Text component="span">
                {moment(new Date(user.joinedAt!)).format('LL')}
              </Text>
            </Text>
          </Center>
          <Divider my="xs" />
          <Center>
            <ActionIcon
              variant="filled"
              color="blue"
              mr={8}
              onClick={() => setOpenedContacts(true)}
            >
              <Edit />
            </ActionIcon>
            <Text size="sm" style={{ lineHeight: 1.5 }} mb={8}>
              <Text weight={500} component="span">
                Contacts:
              </Text>
            </Text>
          </Center>
          <Center>
            {contacts.length > 0 ? (
              <UserContactsList contacts={contacts} />
            ) : (
              <Text size="sm" style={{ lineHeight: 1.5 }} mb={8}>
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
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Title>Tell us about yourself</Title>}
      >
        <AboutForm user={user} />
      </Modal>
      <Modal
        opened={openedContacts}
        onClose={() => setOpenedContacts(false)}
        title={<Title>Give us your contacts</Title>}
      >
        <ContactsForm user={user} />
      </Modal>
      <Modal
        opened={openedUsername}
        onClose={() => setOpenedUsername(false)}
        title={<Title>What is your name?</Title>}
      >
        <UsernameForm user={user} />
      </Modal>
    </Layout>
  );
};

export default UserPage;
