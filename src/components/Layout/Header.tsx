import {
  createStyles,
  Header,
  Burger,
  MediaQuery,
  Box,
  Group,
  Text,
  Title,
  UnstyledButton,
  ThemeIcon,
} from '@mantine/core';
import { DeviceAudioTape } from 'tabler-icons-react';
import Link from 'next/link';
import { UserData } from '../../types';
import { useAuth } from '../../hooks/useAuth';

const useStyles = createStyles((theme) => ({
  title: {
    fontFamily: 'FarOut',
    color: '#d5672f',
  },
  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
    display: 'flex',
    width: '100%',
  },
  header: {
    background: '#e5feff',
    borderBottom: 1,
  },
  leftNav: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    display: 'block',
    borderRadius: theme.radius.sm,
    color: 'black',
    backgroundColor: '#e6e3bd',
    '&:hover': {
      backgroundColor: '#f2f1df',
    },
  },
  button2: {
    display: 'block',
    borderRadius: theme.radius.sm,
    color: '#fffff7',
    backgroundColor: '#3d2d1e',
    '&:hover': {
      backgroundColor: '#856d56',
    },
  },
  button3: {
    display: 'block',
    borderRadius: theme.radius.sm,
    color: '#fff990',
    backgroundColor: '#558da5',
    '&:hover': {
      backgroundColor: '#92bed1',
    },
  },
  logoutButton: {
    display: 'block',
    borderRadius: theme.radius.sm,
    color: '#e3f0ff',
    backgroundColor: '#d5672f',
    '&:hover': {
      backgroundColor: '#e69e7a',
    },
  },
  createButton: {
    display: 'block',
    borderRadius: theme.radius.sm,
    color: 'black',
    backgroundColor: theme.colors.cyan[3],
    '&:hover': {
      backgroundColor: 'white',
    },
  },
}));

interface LayoutProps {
  user: UserData | null;
  open: boolean;
  setOpen: (open: boolean) => any;
}

const HeaderMain: React.FC<LayoutProps> = ({ user, open, setOpen }) => {
  const { classes } = useStyles();
  const { signOut } = useAuth();

  return (
    <Header height={50} className={classes.header}>
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Burger
          opened={open}
          onClick={() => setOpen(!open)}
          size="lg"
          mr="xl"
        />
      </MediaQuery>
      <Group
        className={classes.links}
        sx={{ height: '100%' }}
        px={20}
        position="apart"
      >
        <Box className={classes.leftNav}>
          <Link href="/" passHref={true}>
            <UnstyledButton>
              <Group>
                <ThemeIcon style={{ color: '#3d2d1e' }} variant="light">
                  <DeviceAudioTape />
                </ThemeIcon>
                <Title order={2} className={classes.title}>
                  Thrift It
                </Title>
              </Group>
            </UnstyledButton>
          </Link>
        </Box>
        {user ? (
          <Box className={classes.leftNav}>
            <Link href={`/user/${user.id}`} passHref={true}>
              <UnstyledButton className={classes.button} ml="sm">
                <Text mx="sm" weight={500} py={6}>
                  My profile
                </Text>
              </UnstyledButton>
            </Link>
            <Link href="/myposts" passHref={true}>
              <UnstyledButton className={classes.button2} ml="sm">
                <Text mx="sm" weight={500} py={6}>
                  My posts
                </Text>
              </UnstyledButton>
            </Link>
            <Link href="/new" passHref={true}>
              <UnstyledButton className={classes.button3} ml="sm">
                <Text mx="sm" weight={500} py={6}>
                  Create a post
                </Text>
              </UnstyledButton>
            </Link>
            <Link href="/" passHref={true}>
              <UnstyledButton
                className={classes.logoutButton}
                ml="sm"
                onClick={signOut}
              >
                <Text mx="sm" weight={500} py={6}>
                  SignOut
                </Text>
              </UnstyledButton>
            </Link>
          </Box>
        ) : (
          <Box className={classes.leftNav}>
            <Link href="/sign-in" passHref={true}>
              <UnstyledButton className={classes.logoutButton} ml="sm">
                <Text mx="sm" weight={500} py={6}>
                  SignIn
                </Text>
              </UnstyledButton>
            </Link>
          </Box>
        )}
      </Group>
    </Header>
  );
};

export default HeaderMain;
