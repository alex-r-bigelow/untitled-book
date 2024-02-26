import * as React from 'react';
import chapters from '../chapters/index';

function App() {
  const [currentChapter, setCurrentChapter] = React.useState<
    keyof typeof chapters | null
  >(null);
  return (
    <>
      <h1>Untitled Book</h1>
      <p>
        This is a silly work-in-progress book / book series; just trying to dump
        all the useless lore leftover from my past Mormon life <b>somewhere</b>{' '}
        for now. Nothing to see here yet...
      </p>
      <ul>
        {Object.keys(chapters).map((chapter) => (
          <li key={chapter}>
            <a
              onClick={() =>
                setCurrentChapter(chapter as keyof typeof chapters)
              }
              role="button"
              href="#"
            >
              {chapter}
            </a>
          </li>
        ))}
      </ul>
      <div>
        {currentChapter ? (
          <div dangerouslySetInnerHTML={{ __html: chapters[currentChapter] }} />
        ) : (
          'No chapter selected.'
        )}
      </div>
    </>
  );
}

export default App;
