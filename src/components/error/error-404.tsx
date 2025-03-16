import { Link } from '@tanstack/react-router';

function Error404() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight">404</h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Something's missing.</p>
          <p className="mb-4 text-lg font-light text-gray-500">
            Sorry, we can't find that page. You'll find lots to explore on the home page.{' '}
          </p>
          <Link
            to="/"
            className="hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 my-4 inline-flex rounded-lg bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4 focus:outline-none"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Error404;
