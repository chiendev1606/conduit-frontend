import { Button } from '@/components';
import { FormInput } from '@/components/form';
import { useUpdateUserMutation } from '@/hooks/mutations/user';
import { queryKeys } from '@/hooks/queries/query-key';
import { useProfileQuery } from '@/hooks/queries/use-profile-query';
import { updateUserSchema } from '@/schemas/user';
import { getError } from '@/utils';
import { removeAuthToken } from '@/utils/auth-utils';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth-layout/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  const { user, refetch } = useProfileQuery();
  const { updateUser } = useUpdateUserMutation();
  const navigate = Route.useNavigate();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      image: user?.image || '',
      username: user?.username || '',
      bio: user?.bio || '',
      email: user?.email || '',
      password: '',
    },

    validators: {
      onChange: updateUserSchema as any,
      onSubmitAsync: async ({ value }) => {
        try {
          // Don't send password if it's empty
          const userData = {
            ...value,
            password: value.password.trim() ? value.password : undefined,
          };

          await updateUser(userData);
          // Invalidate profile query to reflect changes
          refetch();
        } catch (error) {
          console.error(error);
          return {
            errors: ['Failed to update profile. Please try again.'],
          };
        }
      },
    },
  });

  const handleLogout = () => {
    removeAuthToken();
    queryClient.invalidateQueries({ predicate: (query) => query.queryKey.includes(queryKeys.articles.all()[0]) });
    navigate({ to: '/' });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Your Settings</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <form.Field name="image">
          {(field) => (
            <FormInput
              label="URL of profile picture"
              name="image"
              placeholder="URL of profile picture"
              value={field.state.value}
              error={getError(field)}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>

        <form.Field name="username">
          {(field) => (
            <FormInput
              label="Username"
              name="username"
              placeholder="Username"
              value={field.state.value}
              error={getError(field)}
              onChange={(e) => field.handleChange(e.target.value)}
              required
            />
          )}
        </form.Field>

        <form.Field name="bio">
          {(field) => (
            <div className="space-y-2">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Short bio about you
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={5}
                className="block w-full rounded-md border border-gray-300 p-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Short bio about you"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {getError(field) && <p className="text-sm text-red-500">{getError(field)}</p>}
            </div>
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <FormInput
              disabled
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              value={field.state.value}
              error={getError(field)}
              onChange={(e) => field.handleChange(e.target.value)}
              required
            />
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <FormInput
              label="New Password"
              name="password"
              type="password"
              placeholder="New Password"
              value={field.state.value}
              error={getError(field)}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>

        <form.Subscribe selector={(state) => ({ submitting: state.isSubmitting, errors: state.errors })}>
          {({ submitting, errors }) => (
            <Button
              className="mt-4 w-auto bg-green-500 px-6 py-3 text-white hover:bg-green-600"
              type="submit"
              isLoading={submitting}
              disabled={submitting || errors.length > 0}
            >
              Update Settings
            </Button>
          )}
        </form.Subscribe>
      </form>

      <div className="mt-8 border-t border-gray-200 pt-4">
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700"
        >
          Or click here to logout.
        </button>
      </div>
    </div>
  );
}
