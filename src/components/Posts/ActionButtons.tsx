import { ActionIcon, Group } from '@mantine/core';
import { Edit, Trash } from 'tabler-icons-react';
import { useAuth } from '../../hooks/useAuth';
import { usePost } from '../../hooks/usePost';
import { UserData } from '../../types';
import Link from 'next/link';

interface ActionButtonsProps {
  owner: UserData;
  postId: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ owner, postId }) => {
  const { user } = useAuth();
  const { deletePost } = usePost();

  const handleDelete = () => {
    deletePost(postId);
  };

  return (
    <>
      {owner.id === user?.id ? (
        <Group>
          <Link href={`/edit/${postId}`} passHref>
            <ActionIcon color="cyan">
              <Edit />
            </ActionIcon>
          </Link>
          <ActionIcon color="orange" onClick={handleDelete}>
            <Trash />
          </ActionIcon>
        </Group>
      ) : null}
    </>
  );
};

export default ActionButtons;
