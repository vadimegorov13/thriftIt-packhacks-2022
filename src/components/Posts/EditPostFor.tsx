import {
  ActionIcon,
  Button,
  Card,
  Center,
  createStyles,
  Group,
  NumberInput,
  Text,
  TextInput,
} from '@mantine/core';
import { formList, useForm } from '@mantine/form';
import { Trash } from 'tabler-icons-react';
import { usePost } from '../../hooks/usePost';
import { PostData } from '../../types';

const useStyles = createStyles((theme) => ({
  title: {
    marginTop: '1rem',
    fontFamily: 'Hoeflers',
    fontWeight: 400,
  },
  card: {
    backgroundColor: '#fffff7',
  },
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

interface EditPostFormProps {
  post: PostData;
}

const EditPostForm: React.FC<EditPostFormProps> = ({ post }) => {
  const { classes } = useStyles();
  const { editPost } = usePost();

  const form = useForm({
    initialValues: {
      title: post!.title,
      description: post!.description,
      reason: post!.reason,
      quality: post!.quality,
      tags: formList(post.tags),
    },

    validate: {
      title: (value) =>
        value.length > 6 ? null : 'Title should be longer than 6 characters',
      description: (value) =>
        value.length > 10
          ? null
          : 'Description should be longer than 10 characters',
      reason: (value) =>
        value.length > 10 ? null : 'Reason should be longer than 10 characters',
      quality: (value) =>
        value !== 0 ? null : 'Please change the quality score',
    },
  });

  const fields = form.values.tags.map((_, index) => (
    <Group key={index} mt="xs">
      <TextInput
        placeholder="clothes, tools, electronics..."
        required
        sx={{ flex: 1 }}
        {...form.getListInputProps('tags', index, 'tag')}
      />
      <ActionIcon
        color="red"
        variant="hover"
        onClick={() => form.removeListItem('tags', index)}
      >
        <Trash size={16} />
      </ActionIcon>
    </Group>
  ));

  return (
    <Center>
      <Card style={{ width: '540px' }} className={classes.card}>
        <form
          onSubmit={form.onSubmit((values) => {
            editPost(post.id, values);
          })}
        >
          <TextInput
            label={<Text className={classes.title}>Title</Text>}
            placeholder="What do you want to give away?"
            radius="xs"
            {...form.getInputProps('title')}
          />

          <TextInput
            label={<Text className={classes.title}>Description</Text>}
            placeholder="Give a short description of the item"
            radius="xs"
            {...form.getInputProps('description')}
          />

          <TextInput
            label={<Text className={classes.title}>Reason</Text>}
            placeholder="People might be interested why you want to give away this item"
            radius="xs"
            {...form.getInputProps('reason')}
          />

          <NumberInput
            defaultValue={0}
            placeholder="Your age"
            label={<Text className={classes.title}>Quality</Text>}
            radius="xs"
            step={1}
            min={0}
            max={10}
            {...form.getInputProps('quality')}
          />

          <Text className={classes.title} mt="md">
            Tags{' '}
          </Text>

          {fields}

          <Group position="right" mt="md">
            <Button
              className={classes.button}
              onClick={() => form.addListItem('tags', { tag: '' })}
            >
              Add Tag
            </Button>
            <Button
              type="submit"
              style={{ width: '90px' }}
              className={classes.button2}
            >
              Submit
            </Button>
          </Group>
        </form>
      </Card>
    </Center>
  );
};

export default EditPostForm;
