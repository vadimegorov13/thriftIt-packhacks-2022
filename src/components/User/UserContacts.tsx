import { Box, Text } from '@mantine/core';
import { UserContacs } from '../../types';

interface UserContactsListProps {
  contacts: UserContacs[];
}

const UserContactsList: React.FC<UserContactsListProps> = ({ contacts }) => {
  return (
    <>
      {contacts.map((contact) => (
        <Box
          key={contact.name + contact.link}
          style={{ minHeight: 10, height: 30 }}
        >
          <Text size="sm" style={{ lineHeight: 1.5 }} mb={8} align="center">
            <Text weight={500} component="span">
              {contact.name}:{' '}
            </Text>
            <Text component="span">{contact.link}</Text>
          </Text>
        </Box>
      ))}
    </>
  );
};

export default UserContactsList;
