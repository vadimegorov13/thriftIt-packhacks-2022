import { Avatar, Group, Text } from '@mantine/core';
import { UserData } from '../../types';

interface PostOwnerProps {
  owner: UserData;
}

const PostOwner: React.FC<PostOwnerProps> = ({ owner }) => {
  return (
    <Group>
      <Avatar src={owner.photoUrl} alt={owner.username} radius="xl" />
      <Text weight={500}>{owner.username}</Text>
    </Group>
  );
};

export default PostOwner;
