import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './App.jsx';
import './VerseDisplay.css';

const copyright =
  'Bible text is provided by the GetBible API. Background images are provided by Wikimedia Commons.';

function buildReference(data) {
  const end =
    Number(data.verseEnd) === Number(data.verseStart)
      ? ''
      : `-${data.verseEnd}`;
  return `${data.bookName} ${data.chapter}:${data.verseStart}${end}`;
}

function extractPassage(payload) {
  return Object.values(payload || {})
    .flatMap((chapter) => chapter.verses || [])
    .map((verse) => verse.text && verse.text.trim())
    .filter(Boolean)
    .join(' ');
}

async function fetchPassage(translation, reference, signal) {
  const url = `https://query.getbible.net/v2/${encodeURIComponent(
    translation
  )}/${encodeURIComponent(reference)}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`GetBible returned ${response.status}`);
  }

  const text = extractPassage(await response.json());
  if (!text) {
    throw new Error('This passage is not included in the selected translation.');
  }
  return text;
}

async function fetchBackgroundPassage(reference, signal) {
  try {
    const url = `https://bible-api.com/${encodeURIComponent(reference)}?translation=bbe`;
    const response = await fetch(url, { signal });
    if (!response.ok) throw new Error(`Bible API returned ${response.status}`);

    const payload = await response.json();
    const text = payload?.text?.replace(/\s+/g, ' ').trim();
    if (!text) throw new Error('The BBE passage is empty.');
    return text;
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    // Background matching should never prevent the selected verse from
    // displaying. WEB is a reliable semantic fallback if BBE is unavailable.
    return fetchPassage('web', reference, signal);
  }
}

function VerseDisplay() {
  const { state, dispatch } = useContext(AppContext);
  const [changeDisplayLocation, setChangeDisplayLocation] = useState(
    'Hero locationTopRight'
  );
  const [changeDimLocation, setChangeDimLocation] = useState(
    'dim dimBlackTopRight'
  );

  useEffect(() => {
    const data = state.searchQuery;
    if (
      !data ||
      data === 'NoSearchRequired' ||
      state.grabbedText === copyright
    ) {
      return undefined;
    }

    const controller = new AbortController();
    const reference = buildReference(data);

    async function loadVerse() {
      try {
        const [displayText, backgroundText] = await Promise.all([
          fetchPassage(data.language, reference, controller.signal),
          fetchBackgroundPassage(reference, controller.signal),
        ]);

        dispatch({
          type: 'UPDATE_INPUT',
          data: `${displayText} ✝︎ ${reference}`,
        });
        dispatch({
          type: 'UPDATE_BACKGROUNDKEYWORD',
          data: backgroundText,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          dispatch({
            type: 'UPDATE_INPUT',
            data: `Sorry, this verse could not be loaded. ${error.message}`,
          });
        }
      } finally {
        if (!controller.signal.aborted) {
          dispatch({ type: 'UPDATE_SEARCH', data: 'NoSearchRequired' });
          dispatch({ type: 'UPDATE_SEARCH_CLICKED', data: false });
        }
      }
    }

    loadVerse();
    return () => controller.abort();
  }, [state.searchQuery, dispatch]);

  function handleDisplay() {
    switch (changeDisplayLocation) {
      case 'Hero locationTopRight':
        setChangeDisplayLocation('Hero locationBotRight');
        setChangeDimLocation('dim dimBlackBotRight');
        break;
      case 'Hero locationBotRight':
        setChangeDisplayLocation('Hero locationBotLeft');
        setChangeDimLocation('dim dimBlackBotLeft');
        break;
      case 'Hero locationBotLeft':
        setChangeDisplayLocation('Hero locationTopLeft');
        setChangeDimLocation('dim dimBlackTopLeft');
        break;
      default:
        setChangeDisplayLocation('Hero locationTopRight');
        setChangeDimLocation('dim dimBlackTopRight');
    }
  }

  return (
    <div className={changeDimLocation}>
      <div className="pueDIV sticky">
        <h1 className={changeDisplayLocation} onClick={handleDisplay}>
          <span className="highlight">{state.grabbedText}</span>
        </h1>
      </div>
    </div>
  );
}

export { copyright };
export default VerseDisplay;
