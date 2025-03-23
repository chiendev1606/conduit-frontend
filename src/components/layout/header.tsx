import { useProfileQuery } from '@/hooks/queries/use-profile-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { Edit, Home, LogIn, Settings, User, UserPlus } from 'lucide-react';
import { ReactNode } from 'react';
import { Button } from '../button';
import { useQueryClient } from '@tanstack/react-query';
import { removeAuthToken } from '@/utils/auth-utils';
import { queryKeys } from '@/hooks/queries/query-key';

interface MenuItem {
  path: string;
  label: string;
  icon?: ReactNode;
  className?: string;
}

export const Header = () => {
  const { data: profile } = useProfileQuery();
  const isAuthenticated = !!profile?.user;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const guestMenuItems: MenuItem[] = [
    {
      path: '/',
      label: 'Home',
      icon: (
        <Home
          size={16}
          className="mr-1"
        />
      ),
    },
    {
      path: '/sign-in',
      label: 'Sign in',
      icon: (
        <LogIn
          size={16}
          className="mr-1"
        />
      ),
    },
    {
      path: '/sign-up',
      label: 'Sign up',
      icon: (
        <UserPlus
          size={16}
          className="mr-1"
        />
      ),
    },
  ];

  // Menu items for authenticated users
  const authMenuItems: MenuItem[] = [
    {
      path: '/',
      label: 'Home',
      icon: (
        <Home
          size={16}
          className="mr-1"
        />
      ),
    },
    {
      path: '/editor',
      label: 'New Post',
      icon: (
        <Edit
          size={16}
          className="mr-1"
        />
      ),
    },
    {
      path: '/settings',
      label: 'Settings',
      icon: (
        <Settings
          size={16}
          className="mr-1"
        />
      ),
    },
    {
      path: '/profile',
      label: profile?.user?.username ?? '',
      icon: (
        <User
          size={16}
          className="mr-1"
        />
      ),
    },
  ];
  const menuItems = isAuthenticated ? authMenuItems : guestMenuItems;

  const logout = () => {
    removeAuthToken();
    queryClient.setQueryData(queryKeys.users.me(), null);
    navigate({ to: '/sign-in' });
  };

  return (
    <header className="border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-green-500"
          >
            conduit
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={item.className ?? 'flex items-center text-gray-400 hover:text-gray-600'}
                activeProps={{ className: 'flex items-center text-gray-900' }}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            {/* Demo toggle button - remove in production */}
            {isAuthenticated && (
              <Button
                className="ml-4 rounded bg-gray-200 px-2 py-1 text-xs"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
