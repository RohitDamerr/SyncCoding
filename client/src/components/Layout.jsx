// client/src/components/Layout.jsx

import React, { useEffect, useState } from "react";
import { WebsocketProvider } from "y-websocket";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { CodeXml, Shell, Braces, Play } from "lucide-react";

import Editor from "./Editor";
import Preview from "./Preview";
import { ydoc, yHtml, yCss, yJs } from "../y-doc";
import { getRandomUser } from "../utils/helpers";
import socket from "../socket";

// ✅ Inline ResizeHandle component
const ResizeHandle = ({ withHandle = false }) => (
  <PanelResizeHandle className="w-1 bg-gray-800 hover:bg-gray-600 transition-colors relative group">
    {withHandle && (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1 h-6 bg-gray-500 rounded group-hover:bg-gray-300" />
      </div>
    )}
  </PanelResizeHandle>
);

const Layout = () => {
  const [htmlPreview, setHtmlPreview] = useState("");
  const [cssPreview, setCssPreview] = useState("");
  const [jsPreview, setJsPreview] = useState("");
  const [provider, setProvider] = useState(null);

  const ROOM_ID = "my-first-project";

  useEffect(() => {
    // Connect WebSocket provider
    const yjsProvider = new WebsocketProvider(
      "ws://localhost:8080",
      ROOM_ID,
      ydoc
    );
    setProvider(yjsProvider);

    // Awareness setup
    const user = getRandomUser();
    yjsProvider.awareness.setLocalStateField("user", {
      name: user.name,
      color: user.color,
    });
    console.log(`👤 Joined as ${user.name}`);

    // Observers for live preview
    const htmlObserver = () => setHtmlPreview(yHtml.toString());
    const cssObserver = () => setCssPreview(yCss.toString());
    const jsObserver = () => setJsPreview(yJs.toString());

    yHtml.observe(htmlObserver);
    yCss.observe(cssObserver);
    yJs.observe(jsObserver);

    return () => {
      yjsProvider.destroy();
      yHtml.unobserve(htmlObserver);
      yCss.unobserve(cssObserver);
      yJs.unobserve(jsObserver);
    };
  }, []);

  return (
    <PanelGroup direction="vertical" className="h-full">
      <Panel defaultSize={55} minSize={25}>
        <PanelGroup direction="horizontal">
          {/* HTML Panel */}
          <Panel defaultSize={33} minSize={15}>
            <div className="flex flex-col h-full bg-gray-900">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 border-b border-gray-700">
                <CodeXml className="text-red-500" size={18} />
                <h2 className="text-sm font-medium text-gray-300">HTML</h2>
              </div>
              <div className="flex-grow">
                <Editor
                  language="html"
                  yText={yHtml}
                  awareness={provider?.awareness}
                />
              </div>
            </div>
          </Panel>

          <ResizeHandle withHandle={true} />

          {/* CSS Panel */}
          <Panel defaultSize={33} minSize={15}>
            <div className="flex flex-col h-full bg-gray-900">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 border-b border-gray-700">
                <Shell className="text-blue-500" size={18} />
                <h2 className="text-sm font-medium text-gray-300">CSS</h2>
              </div>
              <div className="flex-grow">
                <Editor
                  language="css"
                  yText={yCss}
                  awareness={provider?.awareness}
                />
              </div>
            </div>
          </Panel>

          <ResizeHandle withHandle={true} />

          {/* JavaScript Panel */}
          <Panel defaultSize={33} minSize={15}>
            <div className="flex flex-col h-full bg-gray-900">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 border-b border-gray-700">
                <Braces className="text-yellow-500" size={18} />
                <h2 className="text-sm font-medium text-gray-300">
                  JavaScript
                </h2>
              </div>
              <div className="flex-grow">
                <Editor
                  language="javascript"
                  yText={yJs}
                  awareness={provider?.awareness}
                />
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </Panel>

      <ResizeHandle withHandle={true} />

      {/* Live Preview Panel */}
      <Panel defaultSize={45} minSize={20}>
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 border-b border-gray-700">
            <Play className="text-green-500" size={18} />
            <h2 className="text-sm font-medium text-gray-300">Preview</h2>
          </div>
          <Preview
            htmlCode={htmlPreview}
            cssCode={cssPreview}
            jsCode={jsPreview}
          />
        </div>
      </Panel>
    </PanelGroup>
  );
};

export default Layout;
