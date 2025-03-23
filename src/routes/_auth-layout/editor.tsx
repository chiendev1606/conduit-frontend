import { Button } from '@/components';
import { QuillEditor } from '@/components/article/quill-editor';
import { FormInput } from '@/components/form';
import { useCreateArticleMutation } from '@/hooks/mutations/article';
import { createArticleSchema } from '@/schemas/article';
import { getError } from '@/utils';
import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/_auth-layout/editor')({
  component: CreateArticlePage,
});

function CreateArticlePage() {
  const { createArticle } = useCreateArticleMutation();
  const navigate = Route.useNavigate();
  const [tagInput, setTagInput] = useState('');

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tagList: [] as string[],
    },
    validators: {
      onChange: createArticleSchema as any,
      onSubmitAsync: async ({ value }) => {
        try {
          const response = await createArticle(value);
          navigate({ to: `/article/${response.article.slug}` });
        } catch (error) {
          return {
            errors: ['Failed to create article. Please try again.'],
          };
        }
      },
    },
  });

  // Handle tags input
  const addTag = (tag: string) => {
    if (!tag.trim()) return;

    const currentTags = form.state.values.tagList || [];
    if (!currentTags.includes(tag.trim())) {
      form.setFieldValue('tagList', [...currentTags, tag.trim()]);
    }
    setTagInput('');
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.state.values.tagList || [];
    form.setFieldValue(
      'tagList',
      currentTags.filter((tag: string) => tag !== tagToRemove),
    );
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Create New Article</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <form.Field name="title">
          {(field) => (
            <FormInput
              label="Article Title"
              name="title"
              placeholder="Article Title"
              value={field.state.value}
              error={getError(field)}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <FormInput
              label="What's this article about?"
              name="description"
              placeholder="What's this article about?"
              value={field.state.value}
              error={getError(field)}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>

        <form.Field name="body">
          {(field) => (
            <div className="h-[300px] space-y-2">
              <label
                htmlFor="body"
                className="block text-sm font-medium text-gray-700"
              >
                Write your article (in markdown)
              </label>
              <QuillEditor
                value={field.state.value}
                onChange={field.handleChange}
                height="200px"
                placeholder="Write your article content here..."
              />
              {getError(field) && <p className="text-sm text-red-500">{getError(field)}</p>}
            </div>
          )}
        </form.Field>

        <form.Field name="tagList">
          {(field) => (
            <div className="space-y-2">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Tags
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                      e.preventDefault();
                      addTag(tagInput);
                    }
                  }}
                  placeholder="Enter tags"
                  className="block w-full rounded-md border-gray-300 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => addTag(tagInput)}
                  className="ml-2 inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {field.state.value?.map((tag: string) => (
                  <div
                    key={tag}
                    className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:bg-gray-500 focus:text-white focus:outline-none"
                    >
                      <span className="sr-only">Remove tag</span>
                      <svg
                        className="h-2 w-2"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 8 8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          d="M1 1l6 6m0-6L1 7"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              {getError(field) && <p className="text-sm text-red-500">{getError(field)}</p>}
            </div>
          )}
        </form.Field>

        {
          <form.Subscribe selector={(state) => ({ submitting: state.isSubmitting, errors: state.errors })}>
            {({ submitting, errors }) => {
              return (
                <Button
                  className="mt-4 w-auto bg-green-500 px-6 py-3 text-white hover:bg-green-600"
                  type="submit"
                  isLoading={submitting}
                  disabled={submitting || errors.length > 0}
                >
                  Publish Article
                </Button>
              );
            }}
          </form.Subscribe>
        }
      </form>
    </div>
  );
}
