import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from './App.jsx';
import './FetchBackground.css';
import vocabulary4Search from './constants/words';
import queryWordsCreate from './hook/queryWordsCreate';

const copyright =
  'Bible text is provided by the GetBible API. Background images are provided by Wikimedia Commons.';
const fallbackQuery = 'peaceful nature landscape';

function stripHtml(value = '') {
  const element = document.createElement('textarea');
  element.innerHTML = value;
  return element.value.replace(/<[^>]*>/g, '').trim();
}

function chooseImage(payload) {
  const pages = Object.values((payload.query && payload.query.pages) || {});
  const candidates = pages
    .map((page) => {
      const info = page.imageinfo && page.imageinfo[0];
      if (!info || !info.thumburl || !info.extmetadata) return null;

      return {
        id: page.pageid,
        url: info.thumburl,
        descriptionUrl: info.descriptionurl,
        artist: stripHtml(info.extmetadata.Artist?.value) || 'Wikimedia contributor',
        license:
          stripHtml(info.extmetadata.LicenseShortName?.value) ||
          stripHtml(info.extmetadata.UsageTerms?.value) ||
          'See license',
      };
    })
    .filter(Boolean);

  if (!candidates.length) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function FetchBackground() {
  const { state, dispatch } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [failed, setFailed] = useState(false);

  const searchQuery = useMemo(() => {
    const verse = state.searchBackgroundQuery || fallbackQuery;
    const knownWords = vocabulary4Search.map((item) => item.value);
    const result = queryWordsCreate(verse, knownWords);
    const terms = result && result.final;
    return terms && terms !== 'bible' ? `${terms} nature landscape` : fallbackQuery;
  }, [state.searchBackgroundQuery]);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrsearch: searchQuery,
      gsrnamespace: '6',
      gsrlimit: '12',
      prop: 'imageinfo',
      iiprop: 'url|extmetadata',
      iiurlwidth: String(Math.min(2400, Math.max(1280, window.innerWidth * 2))),
      format: 'json',
      origin: '*',
    });

    fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Wikimedia returned ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        const nextImage = chooseImage(payload);
        if (!nextImage) throw new Error('No suitable background image found');
        setImage(nextImage);
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
            src={image.url}
            alt=""
            aria-hidden="true"
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
              href={image.descriptionUrl}
            >
              Photo: {image.artist} · {image.license}
            </a>
          ) : null}
        </p>
      </footer>
    </>
  );
}

export default FetchBackground;
