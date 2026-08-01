import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from './App.jsx';
import './FetchBackground.css';
import {
  chooseBackgroundQueries,
  shouldUsePhotoPreference,
} from './backgroundPhotoQueries';
import { getBrowserPhotoWidth } from './photoSizing';

const photoServiceUrl =
  'https://walking-with-god-photos.kozakurayuki.workers.dev/photo';
const copyright =
  'Bible text is provided by the GetBible API. Background photos are provided by Unsplash.';

function FetchBackground() {
  const { state, dispatch } = useContext(AppContext);
  const [queryPlan, setQueryPlan] = useState([]);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [failed, setFailed] = useState(false);
  const sessionRef = useRef(0);

  useEffect(() => {
    const verse = state.searchBackgroundQuery || '';
    const preference = shouldUsePhotoPreference(verse)
      ? state.photoPreference || ''
      : '';
    const nextQueryPlan = chooseBackgroundQueries(verse, { count: 4 });
    const session = sessionRef.current + 1;
    sessionRef.current = session;
    setQueryPlan(nextQueryPlan);
    setImages(new Array(nextQueryPlan.length));
    setCurrentIndex(0);
    setLoadingIndex(0);

    const controller = new AbortController();
    const params = new URLSearchParams({
      query: nextQueryPlan[0],
      width: String(getBrowserPhotoWidth()),
    });
    if (preference) params.set('preference', preference);

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
        if (sessionRef.current !== session) return;
        setImages((previous) => {
          const next = [...previous];
          next[0] = photo;
          return next;
        });
        setFailed(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError' && sessionRef.current === session) {
          setFailed(true);
        }
      })
      .finally(() => {
        if (sessionRef.current === session) setLoadingIndex(null);
      });

    return () => controller.abort();
  }, [state.searchBackgroundQuery, state.photoPreference]);

  const image = images[currentIndex] || null;

  async function handleNextBackground() {
    if (queryPlan.length < 2 || loadingIndex !== null) return;

    const nextIndex = (currentIndex + 1) % queryPlan.length;
    if (images[nextIndex]) {
      setCurrentIndex(nextIndex);
      setFailed(false);
      return;
    }

    const verse = state.searchBackgroundQuery || '';
    const preference = shouldUsePhotoPreference(verse)
      ? state.photoPreference || ''
      : '';
    const session = sessionRef.current;
    const params = new URLSearchParams({
      query: queryPlan[nextIndex],
      width: String(getBrowserPhotoWidth()),
    });
    if (preference) params.set('preference', preference);
    setLoadingIndex(nextIndex);

    try {
      const response = await fetch(`${photoServiceUrl}?${params}`);
      if (!response.ok) {
        throw new Error(`Photo service returned ${response.status}`);
      }
      const photo = await response.json();
      if (!photo.image || !photo.unsplashUrl || !photo.photographer) {
        throw new Error('Photo service returned incomplete data');
      }
      if (sessionRef.current !== session) return;

      setImages((previous) => {
        const next = [...previous];
        next[nextIndex] = photo;
        return next;
      });
      setCurrentIndex(nextIndex);
      setFailed(false);
    } catch {
      if (sessionRef.current === session) setFailed(true);
    } finally {
      if (sessionRef.current === session) setLoadingIndex(null);
    }
  }

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
      <button
        type="button"
        className="backgroundAdvance"
        aria-label="Show another background photo"
        onClick={handleNextBackground}
      />
      <footer className="myFooter">
        <p className="myFooterP">
          <button type="button" className="footerButton" onClick={handleCopyrightDisplay}>
            ✝︎ Copyright © 2020–26 ART_Project
          </button>
          {image && !failed ? (
            <span className="footerAttribution">
              Photo by{' '}
              <a
                className="footerA"
                target="_blank"
                rel="noreferrer"
                href={image.photographerUrl || image.unsplashUrl}
              >
                {image.photographer}
              </a>{' '}
              on{' '}
              <a
                className="footerA footerAInline"
                target="_blank"
                rel="noreferrer"
                href={image.unsplashUrl}
              >
                Unsplash
              </a>
            </span>
          ) : null}
        </p>
      </footer>
    </>
  );
}

export default FetchBackground;
