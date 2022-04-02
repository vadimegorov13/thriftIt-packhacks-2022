import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { UserData } from '../../types';

interface PostOwnerProps {
  owner: UserData;
}

const PostOwner: React.FC<PostOwnerProps> = ({ owner }) => {
  return (
    <Link href={`/user/${owner.id}`} passHref>
      <UnstyledButton>
        <Group>
          <Avatar src={owner.photoUrl} alt={owner.username} radius="xl" />
          <Text weight={500}>{owner.username}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
};

export default PostOwner;
