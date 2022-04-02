import { UnstyledButton, Group, Text, ThemeIcon } from '@mantine/core';
import { InfoSquare, SmartHome, History, Star } from 'tabler-icons-react';
import Link from 'next/link';
import { UserData } from '../../types';
import { useAuth } from '../../hooks/useAuth';

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
  { icon: <SmartHome size={16} />, color: 'blue', label: 'Home', href: '/' },
  {
    icon: <InfoSquare size={16} />,
    color: 'teal',
    label: 'About',
    href: '/about',
  },
];

const loggedInData = [
  { icon: <SmartHome size={16} />, color: 'blue', label: 'Home', href: '/' },
  {
    icon: <InfoSquare size={16} />,
    color: 'teal',
    label: 'About',
    href: '/about',
  },
  {
    icon: <Star size={16} />,
    color: 'grape',
    label: 'Favorite',
    href: '/favorite',
  },
  {
    icon: <History size={16} />,
    color: 'violet',
    label: 'History',
    href: '/history',
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
        onClick={label === 'Logout' ? signOut : () => {}}
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
    links = loggedInData.map((link) => (
      <NavbarMainLink {...link} key={link.label} />
    ));
  }

  return <div>{links}</div>;
};

export default NavbarMainLinks;
