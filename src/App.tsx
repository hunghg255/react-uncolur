/* eslint-disable unicorn/no-null */
import './App.css';
import { useEffect, useState } from 'react';

import queryString from 'query-string';
import { GithubCorners } from 'react-gh-corners';
import { getColors } from 'uncolur';

import { useCopy } from '@/hooks/useCopy';

function App() {
  const [colors, setColors] = useState<any>();
  const { copied, copyToClipboard } = useCopy();

  useEffect(() => {
    const parsed: any = queryString.parse(window.location.search);

    if (!parsed?.color) {
      return;
    }

    const c = getColors(parsed.color);

    setColors(c);
  }, []);

  const onChange = (e: any) => {
    const c = getColors(e.target.value.slice(1));

    setColors(c);

    window.history.pushState({}, '', `?color=${e.target.value.slice(1)}`);
  };

  return (
    <div>
      <h1>UnColur</h1>

      <div>
        <input type='color' name='color' id='color' onChange={onChange} />
      </div>

      {colors && (
        <>
          <div className='App'>
            <button onClick={() => copyToClipboard(JSON.stringify({ colors }, null, 2))}>
              {copied ? 'Copied' : 'Copy'}
            </button>

            <div className='colors'>
              {Object.keys(colors).map((key: string, idx: number) => {
                return (
                  <div
                    key={key}
                    style={{
                      backgroundColor: colors[key],
                    }}
                  >
                    <div style={{ color: idx > 4 ? 'white' : 'black' }}>{key}</div>
                    <div style={{ color: idx > 4 ? 'white' : 'black' }}>{colors[key]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      <GithubCorners position='right' href='https://github.com/hunghg255/uncolur' />
    </div>
  );
}

export default App;
