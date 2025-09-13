// src/components/Editor.jsx

import React, { useRef, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { MonacoBinding } from 'y-monaco';

// Accepts 'language', a Yjs Text type via 'yText', and awareness for collaborative features.
const Editor = ({ language, yText, awareness }) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (editorRef.current && yText) {
      const binding = new MonacoBinding(
        yText,
        editorRef.current.getModel(),
        new Set([editorRef.current]),
        awareness
      );
      // Cleanup on unmount or when yText changes
      return () => {
        binding.destroy();
      };
    }
  }, [yText, language, awareness]);

  return (
    <MonacoEditor
      height="100%"
      language={language}
      onMount={handleEditorDidMount}
      theme="vs-dark"
      options={{
        selectOnLineNumbers: true,
        wordWrap: 'on',
        minimap: { enabled: false },
        fontSize: 14,
        scrollBeyondLastLine: false,
      }}
    />
  );
};

export default Editor;