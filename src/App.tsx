/* eslint-disable unicorn/no-null */
import './App.css';
import { useEffect, useState } from 'react';

import queryString from 'query-string';
import { GithubCorners } from 'react-gh-corners';
import { getColorsTailwindcss, getColorsAntd } from 'uncolur';

import { useCopy } from '@/hooks/useCopy';

function App() {
  const [colors, setColors] = useState<any>();
  const [coloAnt, setColorsAnt] = useState<any>();
  const [coloAntDark, setColorsAntDark] = useState<any>();
  const { copied, copyToClipboard } = useCopy();

  useEffect(() => {
    const parsed: any = queryString.parse(window.location.search);

    if (!parsed?.color) {
      return;
    }

    const c = getColorsTailwindcss(parsed.color);
    const c1 = getColorsAntd(parsed.color);
    const c2 = getColorsAntd(parsed.color, { theme: 'dark' });

    setColors(c);
    setColorsAnt(c1);
    setColorsAntDark(c2);
  }, []);

  const onChange = (e: any) => {
    const c = getColorsTailwindcss(e.target.value.slice(1));
    const c1 = getColorsAntd(e.target.value.slice(1));
    const c2 = getColorsAntd(e.target.value.slice(1), { theme: 'dark' });

    setColors(c);
    setColorsAnt(c1);
    setColorsAntDark(c2);

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
            <h2>TailwindCSS</h2>

            <button onClick={() => copyToClipboard(JSON.stringify({ colors }, null, 2))}>
              {copied ? 'Copied' : 'Copy'}
            </button>

            <div className='colors'>
              {Object.keys(colors).map((key: string, idx: number) => {
                return (
                  <div
                    key={`t-${key}-${Math.random()}`}
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
          <br />
          <br />
          {coloAnt && (
            <div className='App'>
              <h2>Ant Design</h2>
              <button onClick={() => copyToClipboard(JSON.stringify({ colors }, null, 2))}>
                {copied ? 'Copied' : 'Copy'}
              </button>

              <div className='colors'>
                {coloAnt.map((key: string, idx: number) => {
                  return (
                    <div
                      key={`a-${key}-${Math.random()}`}
                      style={{
                        backgroundColor: key,
                      }}
                    >
                      <div></div>
                      <div style={{ color: idx > 4 ? 'white' : 'black' }}>{key}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <br />
          <br />
          {coloAntDark && (
            <div className='App'>
              <h2>Ant Design Dark</h2>
              <button onClick={() => copyToClipboard(JSON.stringify({ colors }, null, 2))}>
                {copied ? 'Copied' : 'Copy'}
              </button>

              <div className='colors'>
                {coloAntDark.map((key: string, idx: number) => {
                  return (
                    <div
                      key={`ad-${key}-${Math.random()}`}
                      style={{
                        backgroundColor: key,
                      }}
                    >
                      <div></div>
                      <div style={{ color: idx < 5 ? 'white' : 'black' }}>{key}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      <GithubCorners position='right' href='https://github.com/hunghg255/uncolur' />
    </div>
  );
}

export default App;
