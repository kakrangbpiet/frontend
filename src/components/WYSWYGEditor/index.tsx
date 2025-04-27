import  { useState, useRef, useCallback, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const WYSIWYGEditor = ({ value, onChange }) => {
  const [editorValue, setEditorValue] = useState(value);
  const quillRef = useRef(null);

  // Update internal state when external value changes
  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const handleChange = useCallback(
    //todo use delta source editor
    (content, _delta, _source, _editor) => {
      setEditorValue(content);
      if (onChange) {
        onChange(content);
      }
    },
    [onChange]
  );

  // Define toolbar options
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' },],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'link',
    'image',
  ];

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={editorValue}
      onChange={handleChange}
      modules={modules}
      formats={formats}
    />
  );
};

export default WYSIWYGEditor;