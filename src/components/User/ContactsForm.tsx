import { TextInput, Button, Group, Box, ActionIcon } from '@mantine/core';
import { formList, useForm } from '@mantine/form';
import { useAuth } from '../../hooks/useAuth';
import { UserData } from '../../types';
import { Trash } from 'tabler-icons-react';

interface ContactsFormProps {
  user: UserData;
}

const ContactsForm: React.FC<ContactsFormProps> = ({ user }) => {
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
        {fields}

        <Group position="center" mt="md">
          <Button
            onClick={() => form.addListItem('contacts', { name: '', link: '' })}
          >
            Add Contact
          </Button>
        </Group>

        <Group position="right" mt="md">
          <Button type="submit">Update</Button>
        </Group>
      </form>
    </Box>
  );
};

export default ContactsForm;
