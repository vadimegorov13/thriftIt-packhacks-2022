import {
  Avatar,
  Button,
  Card,
  Center,
  createStyles,
  Title,
} from '@mantine/core';
import { Lock } from 'tabler-icons-react';
import { useAuth } from '../hooks/useAuth';
import { BrandGithub, BrandGoogle, BrandTwitter } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  title: {
    fontFamily: 'Delicious',
    fontWeight: 400,
  },
  card: {
    backgroundColor: '#fffff7',
  },
  gitHub: {
    backgroundColor: '#181d24',
    color: 'white',
    width: '15rem',
    '&:hover': {
      backgroundColor: '#080e17',
    },
  },
  google: {
    backgroundColor: '#d5672f',
    color: 'white',
    width: '15rem',
    '&:hover': {
      backgroundColor: '#8a3a11',
    },
  },
  twitter: { width: '15rem' },
}));

const SignInComponent = () => {
  const { classes } = useStyles();
  const { signInWithGoogle, signInWithGitHub, signInWithTwitter } = useAuth();

  return (
    <div style={{ width: 340, margin: 'auto' }}>
      <Card shadow="sm" className={classes.card}>
        <Center m={2}>
          <Avatar color="orange" radius="lg" size="lg">
            <Lock size={40} />
          </Avatar>
        </Center>

        <Title order={1} align="center" className={classes.title}>
          Sign In
        </Title>
        <Card.Section mb={2}>
          <Center>
            <Button
              onClick={signInWithGoogle}
              leftIcon={<BrandGoogle />}
              className={classes.google}
              mt={20}
            >
              Sign in with google
            </Button>
          </Center>
          <Center>
            <Button
              onClick={signInWithGitHub}
              leftIcon={<BrandGithub />}
              className={classes.gitHub}
              my={15}
            >
              Sign in with github
            </Button>
          </Center>
          <Center>
            <Button
              onClick={signInWithTwitter}
              leftIcon={<BrandTwitter />}
              className={classes.twitter}
              mb={10}
            >
              Sign in with Twitter
            </Button>
          </Center>
        </Card.Section>
      </Card>
    </div>
  );
};

export default SignInComponent;
