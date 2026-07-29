import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from './App.jsx';
import './FetchBackground.css';
import vocabulary4Search from './constants/words';
import queryWordsCreate from './hook/queryWordsCreate';

const photoServiceUrl =
  'https://walking-with-god-photos.kozakurayuki.workers.dev/photo';
const copyright =
  'Bible text is provided by the GetBible API. Background photos are provided by Unsplash.';

function choosePhotoTheme(verse, keyword) {
  const text = `${verse || ''} ${keyword || ''}`.toLowerCase();

  if (/(morning|dawn|light|hope|glory|resurrection)/.test(text)) return 'sunrise';
  if (/(evening|night|rest|comfort|peace)/.test(text)) return 'sunset';
  if (/(water|sea|ocean|river|fountain|harbour|beach)/.test(text)) return 'ocean';
  if (/(flower|rose|lilies|spring|garden)/.test(text)) return 'flowers';
  if (/(mountain|strength|eagle|wings|wilderness)/.test(text)) return 'mountains';
  if (/(forest|tree|branches|vine|autumn)/.test(text)) return 'forest';
  if (/(heaven|eternal|stars|night)/.test(text)) return 'stars';
  if (/(peace|pray|faith|grace|holy)/.test(text)) return 'peaceful landscape';

  return 'nature';
}

function FetchBackground() {
  const { state, dispatch } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [failed, setFailed] = useState(false);

  const searchQuery = useMemo(() => {
    const verse = state.searchBackgroundQuery || '';
    const knownWords = vocabulary4Search.map((item) => item.value);
    const result = queryWordsCreate(verse, knownWords);
    const terms = result && result.final;
    return choosePhotoTheme(verse, terms);
  }, [state.searchBackgroundQuery]);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ query: searchQuery });

    fetch(`${photoServiceUrl}?${params}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Photo service returned ${response.status}`);
        return response.json();
      })
      .then((photo) => {
        if (!photo.image || !photo.unsplashUrl || !photo.photographer) {
          throw new Error('Photo service returned incomplete data');
        }
        setImage(photo);
        setFailed(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setFailed(true);
      });

    return () => controller.abort();
  }, [searchQuery]);

  function handleCopyrightDisplay() {
    dispatch({ type: 'UPDATE_INPUT', data: copyright });
  }

  return (
    <>
      <div className={`background ${failed ? 'backgroundFallback' : ''}`}>
        {image && !failed ? (
          <img
            className="img"
            src={image.image}
            alt={image.description || ''}
            referrerPolicy="no-referrer"
          />
        ) : null}
      </div>
      <footer className="myFooter">
        <p className="myFooterP">
          <button type="button" className="footerButton" onClick={handleCopyrightDisplay}>
            ✝︎ Copyright © 2020–26 ART_Project
          </button>
          {image && !failed ? (
            <a
              className="footerA"
              target="_blank"
              rel="noreferrer"
              href={image.unsplashUrl}
            >
              Photo by {image.photographer} on Unsplash
            </a>
          ) : null}
        </p>
      </footer>
    </>
  );
}

export default FetchBackground;
