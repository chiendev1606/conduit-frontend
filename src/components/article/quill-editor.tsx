import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './quill-custom.css';

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
  readOnly?: boolean;
}

// Default Quill modules with text color
export const defaultModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }], // Color pickers for text and background
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
};

export const QuillEditor = ({
  value,
  onChange,
  placeholder = 'Write something...',
  height = '255px',
  readOnly = false,
}: QuillEditorProps) => {
  return (
    <div
      className="quill-custom-font"
      style={{ height: readOnly ? 'auto' : height }}
    >
      <ReactQuill
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={defaultModules}
        style={{ height }}
        readOnly={readOnly}
      />
    </div>
  );
};
