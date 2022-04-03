import { Textarea, Button, Group, Box, createStyles } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from '../../hooks/useAuth';
import { UserData } from '../../types';

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: '#ffff9d',
    color: '#8a1a29',

    '&:hover': {
      backgroundColor: '#f7f7ad',
    },
  },
}));
interface AboutFormProps {
  user: UserData;
}

const AboutForm: React.FC<AboutFormProps> = ({ user }) => {
  const { classes } = useStyles();
  const { updateAbout } = useAuth();

  const form = useForm({
    initialValues: {
      about: user.about,
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => updateAbout(values.about))}>
        <Textarea
          required
          radius="xs"
          size="md"
          placeholder="I just want ot get rid of some stuff"
          {...form.getInputProps('about')}
        />

        <Group position="right" mt="md">
          <Button type="submit" className={classes.button}>
            Update
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default AboutForm;
