import { Link } from '@tanstack/react-router';

export const Header = () => {
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
            <Link
              to="/"
              className="text-gray-400 hover:text-gray-600"
              activeProps={{ className: 'text-gray-900' }}
            >
              Home
            </Link>
            <Link
              to="/sign-in"
              className="text-gray-400 hover:text-gray-600"
              activeProps={{ className: 'text-gray-900' }}
            >
              Sign in
            </Link>
            <Link
              to="/sign-up"
              className="text-gray-400 hover:text-gray-600"
              activeProps={{ className: 'text-gray-900' }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
