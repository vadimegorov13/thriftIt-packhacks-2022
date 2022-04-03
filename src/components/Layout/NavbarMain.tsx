import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import {
  Login,
  Logout,
  Notes,
  SmartHome,
  SquarePlus,
  User,
} from 'tabler-icons-react';
import { useAuth } from '../../hooks/useAuth';
import { UserData } from '../../types';

interface NavbarMainLinkProps {
  icon: JSX.Element;
  color: string;
  label: string;
  href: string;
}

interface NavbarMainLinksProps {
  user: UserData | null;
  loading: boolean;
}

const data = [
  { icon: <SmartHome size={16} />, color: 'green', label: 'Home', href: '/' },
  {
    icon: <Login size={16} />,
    color: 'teal',
    label: 'SignIn',
    href: '/sign-in',
  },
];

export const NavbarMainLink: React.FC<NavbarMainLinkProps> = ({
  icon,
  color,
  label,
  href,
}) => {
  const { signOut } = useAuth();

  return (
    <Link href={href} passHref={true}>
      <UnstyledButton
        sx={(theme: any) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          backgroundColor: 'inherit',
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        })}
        onClick={label === 'SignOut' ? signOut : () => {}}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="lg" weight="500" color="black">
            {label}
          </Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
};

const NavbarMainLinks: React.FC<NavbarMainLinksProps> = ({ loading, user }) => {
  let links = null;

  if (loading) {
    links = null;
  } else if (!user) {
    links = data.map((link) => <NavbarMainLink {...link} key={link.label} />);
  } else {
    const loggedInData = [
      {
        icon: <SmartHome size={16} />,
        color: 'green',
        label: 'Home',
        href: '/',
      },
      {
        icon: <User size={16} />,
        color: 'cyan',
        label: 'My Profile',
        href: `/user/${user!.id}`,
      },
      {
        icon: <Notes size={16} />,
        color: 'blue',
        label: 'My Posts',
        href: '/myposts',
      },
      {
        icon: <SquarePlus size={16} />,
        color: 'teal',
        label: 'Create a post',
        href: '/new',
      },
      {
        icon: <Logout size={16} />,
        color: 'red',
        label: 'SignOut',
        href: '/',
      },
    ];

    links = loggedInData.map((link) => (
      <NavbarMainLink {...link} key={link.label} />
    ));
  }

  return <div>{links}</div>;
};

export default NavbarMainLinks;
