import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from '../../hooks/useAuth';
import { UserData } from '../../types';

interface UsernameFormProps {
  user: UserData;
}

const UsernameForm: React.FC<UsernameFormProps> = ({ user }) => {
  const { updateUsername } = useAuth();

  const form = useForm({
    initialValues: {
      username: user.username,
    },

    validate: {
      username: (value) =>
        value.length >= 3
          ? null
          : 'Your name cannot be shorter than 3 characters',
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form
        onSubmit={form.onSubmit((values) => updateUsername(values.username))}
      >
        <TextInput
          required
          placeholder="John Doe"
          {...form.getInputProps('username')}
        />

        <Group position="right" mt="md">
          <Button type="submit" color={'cyan'}>
            Update
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default UsernameForm;
