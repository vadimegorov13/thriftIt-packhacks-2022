import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from '../../hooks/useAuth';
import { UserData } from '../../types';

interface AboutFormProps {
  user: UserData;
}

const AboutForm: React.FC<AboutFormProps> = ({ user }) => {
  const { updateAbout } = useAuth();

  const form = useForm({
    initialValues: {
      about: user.about,
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => updateAbout(values.about))}>
        <TextInput
          required
          placeholder="I just want ot get rid of some stuff"
          {...form.getInputProps('about')}
        />

        <Group position="right" mt="md">
          <Button type="submit">Update</Button>
        </Group>
      </form>
    </Box>
  );
};

export default AboutForm;
