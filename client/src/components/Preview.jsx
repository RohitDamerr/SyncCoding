// client/src/components/Preview.jsx

import React, { useState, useEffect } from 'react';

const Preview = ({ htmlCode, cssCode, jsCode }) => {
  // Our local state for the srcDoc remains the same.
  const [srcDoc, setSrcDoc] = useState('');

  // The useEffect hook is where we'll implement our debounce logic.
  useEffect(() => {
    // We set up a timer to delay the update of the srcDoc.
    // The update will only happen after the user has stopped typing for 500ms.
    const timeoutId = setTimeout(() => {
      // Inside the timeout, we construct the document as before.
      const srcDocContent = `
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${cssCode}</style>
          </head>
          <body>
            ${htmlCode}
            <script>${jsCode}</script>
          </body>
        </html>
      `;
      // And we update our state. This will cause the iframe to re-render.
      setSrcDoc(srcDocContent);
    }, 500); // 500 millisecond delay

    // This is the crucial part: the cleanup function.
    // This function will be called by React right before the effect is re-run.
    // This happens every time htmlCode, cssCode, or jsCode changes.
    return () => clearTimeout(timeoutId);

  }, [htmlCode, cssCode, jsCode]); // The effect still depends on the code.

  return (
    <iframe
      title="Live Preview"
      className="w-full h-full bg-white"
      sandbox="allow-scripts"
      srcDoc={srcDoc}
    />
  );
};

export default Preview;