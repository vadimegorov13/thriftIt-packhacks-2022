import {
  Avatar,
  Box,
  Center,
  Divider,
  Paper,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { UserData } from '../../types';
import Layout from '../Layout/Layout';
import UserPosts from './UserPosts';
import moment from 'moment';

interface UserPageProps {
  user: UserData;
}

const UserPage: React.FC<UserPageProps> = ({ user }) => {
  return (
    <Layout>
      <Paper shadow="sm" p="lg" m={10}>
        <Box style={{ maxWidth: '400px', margin: 'auto' }}>
          <Center>
            <UnstyledButton>
              <Avatar
                src={user.photoUrl}
                alt={user.username}
                radius="lg"
                size={'lg'}
              />
            </UnstyledButton>
          </Center>
          <Center>
            <Title>{user.username}</Title>
          </Center>

          <Divider my="xs" />

          <Center>
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
            <Text size="sm" style={{ lineHeight: 1.5 }} mb={8}>
              <Text weight={500} component="span">
                Contacts:
              </Text>
            </Text>
          </Center>
        </Box>
      </Paper>
      <UserPosts userId={user.id} />
    </Layout>
  );
};

export default UserPage;
