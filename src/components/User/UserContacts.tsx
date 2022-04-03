import { Group, Text } from '@mantine/core';
import { UserContacs } from '../../types';

interface UserContactsListProps {
  contacts: UserContacs[];
}

const UserContactsList: React.FC<UserContactsListProps> = ({ contacts }) => {
  return (
    <>
      {contacts.map((contact) => (
        <div key={contact.name + contact.link}>
          <Group>
            <Text size="sm" style={{ lineHeight: 1.5 }} mb={8}>
              <Text weight={500} component="span">
                {contact.name}:{' '}
              </Text>
              <Text component="span">{contact.link}</Text>
            </Text>
          </Group>
        </div>
      ))}
    </>
  );
};

export default UserContactsList;
