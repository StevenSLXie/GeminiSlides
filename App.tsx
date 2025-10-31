import React, { useState } from 'react';
import CreationPanel from './components/CreationPanel';
import Editor from './components/Editor';

export interface Presentation {
  code: { html: string; css: string; js: string };
  prompt: string;
}

const App: React.FC = () => {
  const [presentation, setPresentation] = useState<Presentation | null>(null);

  const handleGenerate = (html: string, css: string, js: string, prompt: string) => {
    setPresentation({ code: { html, css, js }, prompt });
  };
  
  const handleBack = () => {
    setPresentation(null);
  }

  if (!presentation) {
    return <CreationPanel onGenerate={handleGenerate} />;
  }

  return <Editor initialPresentation={presentation} onBack={handleBack} />;
};

export default App;