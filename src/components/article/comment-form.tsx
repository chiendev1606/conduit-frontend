import { useForm } from '@tanstack/react-form';
import { Button } from '../button';
import { QuillEditor } from './quill-editor';

interface CommentFormProps {
  initialValue?: string;
  onSubmit: (value: string) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
  height?: string;
}

export const CommentForm = ({
  initialValue = '',
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = 'Post Comment',
  height = '255px',
}: CommentFormProps) => {
  const form = useForm({
    defaultValues: {
      comment: initialValue,
    },
    onSubmit: async ({ value, formApi }) => {
      onSubmit(value.comment);
      if (!onCancel) {
        formApi.reset({ comment: '' });
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div style={{ height: 250 }}>
        <form.Field name="comment">
          {(field) => (
            <QuillEditor
              value={field.state.value}
              onChange={field.handleChange}
              placeholder="Write a comment..."
              height="230px"
            />
          )}
        </form.Field>
      </div>
      <div className="mt-8 flex justify-end">
        <form.Subscribe selector={(state) => ({ errors: state.errors })}>
          {({ errors }) => (
            <>
              {onCancel && (
                <Button
                  className="mr-2 rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              )}
              <Button
                className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                type="submit"
                disabled={isLoading || errors.length > 0}
                isLoading={isLoading}
              >
                {submitLabel}
              </Button>
            </>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
};
