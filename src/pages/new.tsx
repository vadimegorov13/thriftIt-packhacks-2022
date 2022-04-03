import {
  ActionIcon,
  Button,
  Center,
  Group,
  NumberInput,
  Text,
  TextInput,
  useMantineTheme,
  Card,
  createStyles,
} from '@mantine/core';
import { formList, useForm } from '@mantine/form';
import { Trash } from 'tabler-icons-react';
import Layout from '../components/Layout/Layout';
import { usePost } from '../hooks/usePost';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { useState } from 'react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { dropzoneChildren } from '../components/Posts/DropZoneChildren';

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

const New = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const { loading } = useRequireAuth();
  const { createPost } = usePost();

  const [filesToUpload, setFiles] = useState<File[] | null>(null);

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      reason: '',
      quality: 0,
      tags: formList([{ tag: '' }]),
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

  let body = null;

  if (loading) {
    body = (
      <Text align="center" size="xl">
        Loading...
      </Text>
    );
  } else {
    body = (
      <Center>
        <Card style={{ width: '540px' }} className={classes.card}>
          <form
            onSubmit={form.onSubmit((values) =>
              createPost(values, filesToUpload!)
            )}
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

            <Group position="right" my="md">
              <Button
                className={classes.button}
                onClick={() => form.addListItem('tags', { tag: '' })}
              >
                Add Tag
              </Button>
            </Group>

            <Dropzone
              onDrop={(files) => setFiles(files)}
              onReject={(files) => console.log('rejected files', files)}
              maxSize={3 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
            >
              {(status) => dropzoneChildren(status, theme)}
            </Dropzone>

            <Group position="right" mt="md">
              <Button
                type="submit"
                disabled={!filesToUpload}
                className={classes.button2}
              >
                Submit
              </Button>
            </Group>
          </form>
        </Card>
      </Center>
    );
  }

  return <Layout>{body}</Layout>;
};

export default New;
