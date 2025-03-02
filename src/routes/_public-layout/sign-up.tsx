import { createFileRoute } from '@tanstack/react-router';

import { Button, Link, Logo } from '@/components';
import { FormInput } from '@/components/form';
import { useForm } from '@tanstack/react-form';

import { useSignUp } from '@/hooks/mutations/auth';
import { signUpSchema } from '@/schemas/auth';
import { delay, handleErrorApi } from '@/utils';
import { toast } from 'sonner';

export const Route = createFileRoute('/_public-layout/sign-up')({
  component: SignUpPage,
});

function SignUpPage() {
  const { signUp } = useSignUp();

  const navigate = Route.useNavigate();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onChange: signUpSchema,
      onSubmitAsync: async ({ value }) => {
        try {
          await signUp(value);
          toast.success('Sign up successfully');
          await delay(2000);
          navigate({ to: '/sign-in' });
        } catch (error) {
          return {
            fields: {
              email: { message: handleErrorApi(error) },
            },
          };
        }
      },
    },
  });

  const getError = (field: any) => {
    return field.state.meta.isTouched ? field.state.meta.errors?.[0]?.message : undefined;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="relative w-full max-w-md">
        {/* Background decoration elements */}
        <div className="absolute -top-10 -left-10 -z-10 h-40 w-40 rounded-lg bg-gray-200"></div>
        <div className="absolute -right-8 -bottom-16 -z-10 h-48 w-48 rounded-lg bg-gray-200"></div>

        {/* Main card */}
        <div className="w-full rounded-lg bg-white p-8 shadow-md">
          {/* Logo */}
          <div className="mb-6">
            <Logo />
          </div>

          {/* Heading */}
          <h1 className="mb-1 text-center text-xl font-semibold text-gray-700">Adventure starts here 🚀</h1>
          <p className="mb-6 text-center text-gray-500">Make your app management easy and fun!</p>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <div>
              <form.Field name="email">
                {(field) => (
                  <FormInput
                    label="Email"
                    name="email"
                    placeholder="john.doe@example.com"
                    error={getError(field)}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              </form.Field>
            </div>

            <div>
              <form.Field name="password">
                {(field) => (
                  <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    error={getError(field)}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              </form.Field>
            </div>

            <div>
              <form.Field name="confirmPassword">
                {(field) => (
                  <FormInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    error={getError(field)}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              </form.Field>
            </div>

            {
              <form.Subscribe selector={(state) => ({ submitting: state.isSubmitting, errors: state.errors })}>
                {({ submitting, errors }) => (
                  <Button
                    className="mt-4 w-full"
                    type="submit"
                    isLoading={submitting}
                    disabled={submitting || errors.length > 0}
                  >
                    Sign up
                  </Button>
                )}
              </form.Subscribe>
            }
          </form>

          {/* Sign in link */}
          <div className="mt-4 text-center">
            <p className="space-x-1 text-sm text-gray-600">
              <span> Already have an account?</span>
              <Link
                to="/sign-in"
                className="text-primary"
              >
                Sign in instead
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social media buttons */}
          <div className="flex justify-center space-x-4">
            <button
              className="rounded-md bg-gray-100 p-2 hover:bg-gray-200"
              aria-label="Sign up with Facebook"
            >
              <svg
                className="h-5 w-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 320 512"
              >
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
              </svg>
            </button>
            <button
              className="rounded-md bg-gray-100 p-2 hover:bg-gray-200"
              aria-label="Sign up with Twitter"
            >
              <svg
                className="h-5 w-5 text-blue-400"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
              </svg>
            </button>
            <button
              className="rounded-md bg-gray-100 p-2 hover:bg-gray-200"
              aria-label="Sign up with Google"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 488 512"
              >
                <path
                  fill="#DB4437"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
