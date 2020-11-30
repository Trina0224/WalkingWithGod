// ES Modules syntax
import React,{useContext, useState, useEffect, useRef} from 'react';
import fetch from 'node-fetch';
//import Unsplash, { toJson } from 'unsplash-js';

//import {Helmet} from 'react-helmet';

import { AppContext } from './App'

import './FetchBackground.css';
import vocabulary4Search from './constants/words.js';
import queryWordsCreate from './hook/queryWordsCreate.js';

//import ContextBP from './store/City_context.js'

const defaultword = 'bible';




const clientID = process.env.REACT_APP_UNSPLASH4GOD_API_KEY;


const loadData = (options) => {
  fetch(options.url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
       if (options.onSuccess) options.onSuccess(data)
    })
}


//function FetchBackground({ContextBP}){
function FetchBackground(){
  const {state, dispatch} = useContext(AppContext);
  //below is an example code to check vocabulary.
  //console.log(state.searchBackgroundQuery);//any change, and background will also changed.
  //extract values to a new array for usage.
  const map = vocabulary4Search.map(function(x){
    return x.value;
  });
  // console.log(map1);
  //compare state.searchBackgroundQuery and vocabulary4Search.
  let verse;
  if(state.searchBackgroundQuery){
    verse = state.searchBackgroundQuery;
  }
  else{
    verse = defaultword; //default word.
  }
  let searchQuery = queryWordsCreate(verse, map);
  if(searchQuery === state.searchBackgroundQuery){
    searchQuery = defaultword; //no mapping word in record. use default word.
  }
  console.log(searchQuery);

  let [photos, setPhotos] = useState([]);
  //let searchQuery='bible';//'christian';
  const numberOfPhotos = 1;
  const url =
    "https://api.unsplash.com/photos/random/?count=" +
    numberOfPhotos +
    "&client_id=" +
    clientID;
  useEffect(() => {

    const photosUrl = `${url}&query=${searchQuery}`;
    //console.log(photosUrl);
    loadData({
      url: photosUrl,
      onSuccess: res => {
        //console.log(cityQuery);
        console.log("debug Here!");
        //let deliverMsg = [cityQuery,false,city4Now[2]];
        //setCity(deliverMsg);
        setPhotos(res);
      }
    });
  }, [searchQuery, url]);

  const searchPhotos = e => {
    //e.preventDefault();
    ;//setQuery(queryInput.current.value);
  };

  // let myBackgroundURL="";
  // let parser4BP="";


  function handleCopyrightDisplay(){
    console.log("got clicked");
    const copyright="All verses are from m.ibibles.net and getbible.net."
    dispatch({ type: 'UPDATE_INPUT', data: copyright,});
  }


  return (
    <div className="xxxxx divtest">
    <div className="grid ">
    { searchQuery ?
        photos.map(photo => {
        return (
          <div key={photo.id} className="item">
            <img
            className="img "
            src={photo.urls.regular}
            />
          </div>
          );
      }) : ""}
    </div>
    <footer className="myFooter">
    <p className="myFooterP"><span onclick={handleCopyrightDisplay}>Copyright</span> © 2020 ART_Project
    {
        photos.map(photo => {
        return (
            <a className="footerA"
            target="_blank"
            href={photo.user.links.html}
            >Photo {photo.user.name}/Unsplash ©</a>
          );
      })}


    </p>
    </footer>
    </div>
  );
}
//{9.links.html}user.name  urls.raw

export default FetchBackground;
