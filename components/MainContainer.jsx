import { useState } from 'react';

// Components
import Navbar from './Navbar';
import Markdown from './MarkdownContainer';

export default function MainContainer({
  isSidebarOpen,
  currentMarkdown,
  setIsSidebarOpen,
  setCurrentMarkdown,
}) {
  const [content, setContent] = useState('');

  return (
    <div className="min-h-screen w-full flex-shrink-0 bg-white dark:bg-primary-1000 md:flex-shrink">
      <Navbar
        content={content}
        setContent={setContent}
        isSidebarOpen={isSidebarOpen}
        currentMarkdown={currentMarkdown}
        setIsSidebarOpen={setIsSidebarOpen}
        setCurrentMarkdown={setCurrentMarkdown}
      />

      <Markdown
        content={content}
        setContent={setContent}
        currentMarkdown={currentMarkdown}
        setCurrentMarkdown={setCurrentMarkdown}
      />
    </div>
  );
}
