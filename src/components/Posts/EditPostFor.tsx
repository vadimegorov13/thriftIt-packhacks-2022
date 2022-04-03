import { PostData } from '../../types';
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  NumberInput,
  TextInput,
  Card,
} from '@mantine/core';
import { formList, useForm } from '@mantine/form';
import { Trash } from 'tabler-icons-react';
import { usePost } from '../../hooks/usePost';

interface EditPostFormProps {
  post: PostData;
}

const EditPostForm: React.FC<EditPostFormProps> = ({ post }) => {
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
      <Card style={{ width: '540px' }}>
        <form
          onSubmit={form.onSubmit((values) => {
            editPost(post.id, values);
          })}
        >
          <TextInput
            required
            label="Title"
            placeholder="What do you want to give away?"
            radius="xs"
            {...form.getInputProps('title')}
          />

          <TextInput
            required
            label="Description"
            placeholder="Give a short description of the item"
            radius="xs"
            {...form.getInputProps('description')}
          />

          <TextInput
            required
            label="Reason"
            placeholder="People might be interested why you want to give away this item"
            radius="xs"
            {...form.getInputProps('reason')}
          />

          <NumberInput
            defaultValue={0}
            placeholder="Your age"
            label="Quality"
            radius="xs"
            step={1}
            min={0}
            max={10}
            {...form.getInputProps('quality')}
          />

          <Box>Tags: </Box>

          {fields}

          <Group position="right" mt="md">
            <Button onClick={() => form.addListItem('tags', { tag: '' })}>
              Add Tag
            </Button>
          </Group>

          <Group position="right" mt="md">
            <Button type="submit" style={{ width: '90px' }}>
              Submit
            </Button>
          </Group>
        </form>
      </Card>
    </Center>
  );
};

export default EditPostForm;
