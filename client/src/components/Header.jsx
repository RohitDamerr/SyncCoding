// src/components/Header.jsx

import React from 'react';
import { Github, Save, Share2 } from 'lucide-react'; // Example icons

const Header = () => {
  return (
    // The main header container
    <header className="bg-gray-800 text-white p-3 flex justify-between items-center border-b border-gray-700">
      
      {/* Left side: Logo and Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-sky-500 rounded-md flex items-center justify-center font-bold text-xl">
          C
        </div>
        <h1 className="text-xl font-semibold">CodeCollab</h1>
      </div>

      {/* Center: (Placeholder for project title) */}
      <div>
        <p className="text-gray-400">Untitled Project</p>
      </div>

      {/* Right side: Action Buttons */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition-colors px-3 py-1.5 rounded-md text-sm">
          <Save size={16} />
          Save
        </button>
        <button className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 transition-colors px-3 py-1.5 rounded-md text-sm">
          <Share2 size={16} />
          Share
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 transition-colors p-2 rounded-md">
          <Github size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;