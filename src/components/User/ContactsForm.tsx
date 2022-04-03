import {
  TextInput,
  Button,
  Group,
  Box,
  ActionIcon,
  createStyles,
} from '@mantine/core';
import { formList, useForm } from '@mantine/form';
import { useAuth } from '../../hooks/useAuth';
import { UserData } from '../../types';
import { Trash } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: '#ff6138',
    color: '#ffffff',

    '&:hover': {
      backgroundColor: '#ff8c6e',
    },
  },
  button2: {
    backgroundColor: '#bdeb9f',
    color: '#8a1a29',

    '&:hover': {
      backgroundColor: '#d4f0c2',
    },
  },
}));
interface ContactsFormProps {
  user: UserData;
}

const ContactsForm: React.FC<ContactsFormProps> = ({ user }) => {
  const { classes } = useStyles();
  const { updateContacts } = useAuth();

  let contacts = [{ name: '', link: '' }];

  if (user.contacts.length > 0) {
    contacts = user.contacts;
  }

  const form = useForm({
    initialValues: {
      contacts: formList(contacts),
    },
  });

  const fields = form.values.contacts.map((_, index) => (
    <Group key={index} mt="xs">
      <TextInput
        placeholder="Twitter, Facebook, Discord"
        required
        title="Social media"
        sx={{ flex: 1 }}
        {...form.getListInputProps('contacts', index, 'name')}
      />

      <TextInput
        placeholder="@johndoe, facebook link, johndoe#6969"
        required
        title="Username"
        sx={{ flex: 1 }}
        {...form.getListInputProps('contacts', index, 'link')}
      />

      <ActionIcon
        color="red"
        variant="hover"
        onClick={() => form.removeListItem('contacts', index)}
      >
        <Trash size={16} />
      </ActionIcon>
    </Group>
  ));

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form
        onSubmit={form.onSubmit((values) => updateContacts(values.contacts))}
      >
        <Box mt={25}>{fields}</Box>

        <Group position="right" mt="md"></Group>

        <Group position="right" mt="md">
          <Button
            onClick={() => form.addListItem('contacts', { name: '', link: '' })}
            className={classes.button2}
          >
            Add Contact
          </Button>
          <Button type="submit" className={classes.button}>
            Update
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default ContactsForm;
