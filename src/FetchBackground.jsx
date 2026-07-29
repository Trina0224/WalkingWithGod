import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './App.jsx';
import './FetchBackground.css';
import { chooseBackgroundQuery } from './backgroundPhotoQueries';

const photoServiceUrl =
  'https://walking-with-god-photos.kozakurayuki.workers.dev/photo';
const copyright =
  'Bible text is provided by the GetBible API. Background photos are provided by Unsplash.';

function FetchBackground() {
  const { state, dispatch } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const verse = state.searchBackgroundQuery || '';
    const searchQuery = chooseBackgroundQuery(verse);
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
  }, [state.searchBackgroundQuery]);

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
