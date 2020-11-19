// ES Modules syntax
import React,{useContext, useState, useEffect, useRef} from 'react';
import fetch from 'node-fetch';
//import Unsplash, { toJson } from 'unsplash-js';

//import {Helmet} from 'react-helmet';

//import { AppContext } from './App'

import './FetchBackground.css';

//import ContextBP from './store/City_context.js'






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
  let [photos, setPhotos] = useState([]);
  let searchQuery='christian';
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
    <p className="myFooterP">Copyright © 2020 ART_Project
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
