// ES Modules syntax
import React,{useContext, useState, useEffect, useRef} from 'react';
import { Dimensions } from 'react-native';
import fetch from 'node-fetch';
//import Unsplash, { toJson } from 'unsplash-js';

//import {Helmet} from 'react-helmet';

import { AppContext } from './App'

import './FetchBackground.css';
import vocabulary4Search from './constants/words.js';
import queryWordsCreate from './hook/queryWordsCreate.js';
import shuffle from './hook/shuffle.js';

//import ContextBP from './store/City_context.js'

const defaultword = 'bible';


const copyright="All verses are from m.ibibles.net and getbible.net. All Bible verses belong to the sources. "


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
  const [oldSearchQuery, setOldSearchQuery] = useState(defaultword); //for not reflash background so often.
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const window = Dimensions.get("window");
  const screen = Dimensions.get("screen");
  let orientation = "landscape";//landscape for default.
  let backgroundImageSize = "regular";//can be small,full or regular, we will not use thumb and raw
  const [dimensions, setDimensions] = useState({ window, screen });
  //console.log(`windowHeight=${windowHeight}, windowWidth=${windowWidth}`);

  const onChange = ({ window, screen }) => {
  setDimensions({ window, screen });
  console.log(dimensions);
  };
  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  //below is an example code to check vocabulary.
  //console.log(state.searchBackgroundQuery);//any change, and background will also changed.
  //extract values to a new array for usage.
  const map = vocabulary4Search.map(function(x){
    return x.value;
  });
  // console.log(map1);
  //compare state.searchBackgroundQuery and vocabulary4Search.
  let verse;
  let searchQuery;
  let searchSet;

  if(state.searchBackgroundQuery){
    verse = state.searchBackgroundQuery;
  }
  else{
    verse = defaultword; //default word.
  }
  searchSet = queryWordsCreate(verse,map);
  //searchQuery = queryWordsCreate(verse, map);
  console.log(searchSet);
  console.log(oldSearchQuery);
  console.log(searchSet.keyWordsSet);
  console.log(oldSearchQuery.keyWordsSet);
  if(arraysEqual(oldSearchQuery.keyWordsSet, searchSet.keyWordsSet)){
  //if(oldSearchQuery.keyWordsSet == searchSet.keyWordsSet){
    //same set means no need to re-fetch background.
    //可是如果set是空的怎麼辦？還不知道...後面要檢查一下怎麼辦...因為進到bible會鎖住沒辦法換畫面
    console.log("No Background Chgange require.");
    searchQuery = oldSearchQuery.final;
  }else{
    //if search key clicked.
    if(state.isSearchKeyClicked){
      console.log("Background Chgange require becuase clicked");
      searchQuery = searchSet.final;
    }else{
      console.log("No Background Chgange require. because no clicked");
      searchQuery = oldSearchQuery.final;
    }

  }
  //setOldSearchQuery(searchQuery);
  //  searchQuery = oldSearchQuery;


  if(searchQuery === state.searchBackgroundQuery){// verses is the same one.
    //searchQuery = defaultword; //no mapping word in record. use default word.
    //if(searchSet.final !== defaultword && searchSet.final !=="")
      searchQuery = searchSet.final;//i think this one is right, not defaultword.
    //else
      //searchQuery = defaultword; //no mapping word in record. use default word.

  }

  console.log(searchQuery);



  let [photos, setPhotos] = useState([]);
  //let searchQuery='bible';//'christian';
  const numberOfPhotos = 1;
  //control orientation
  if(dimensions.window.width > dimensions.window.height){
    orientation = "landscape";
  }else{
    if(dimensions.window.width === dimensions.window.height)
      orientation = "squarish";
    else
      orientation = "portrait";
  }
  //control size
  if(dimensions.window.width < 450){ //current mobile phone portrait mode is less than 450.
    backgroundImageSize = "small";
  }else{
    if(dimensions.window.width >=1824){
      backgroundImageSize = "full";
    }else{
      backgroundImageSize = "regular";
    }
  }

  const url =
    "https://api.unsplash.com/photos/random/?count=" +
    numberOfPhotos +
    "&client_id=" +
    clientID +
    "&orientation=" +
    orientation; //can be landscape,portrait or squarish.
  //console.log(orientation);

  useEffect(() => {

    let photosUrl = `${url}&query=${searchQuery}`;
    //console.log(photosUrl);
//    if(state.enableBackgroundChange){
//      //if only hide/unhide form, we dont need to go through this part.
    if(searchQuery === defaultword){
      // let tempArray=photos;
      // shuffle(tempArray);
      // setPhotos(tempArray);
      // console.log(tempArray);
      let tempuse = Math.floor(Math.random() * 10);     // returns a random integer from 0 to 9
      if(tempuse>=5)
        photosUrl = `${url}&query="Jesus"`;
      else{
        ;
      }// means around 50 % use bible 50% Jesus
      //console.log(photosUrl);
      loadData({
        url: photosUrl,
        onSuccess: res => {
          //console.log(cityQuery);
          //console.log("debug Here!");
          //let deliverMsg = [cityQuery,false,city4Now[2]];
          //setCity(deliverMsg);
          setPhotos(res);
          //console.log(res);
        }
      });


    }else{
      loadData({
        url: photosUrl,
        onSuccess: res => {
          //console.log(cityQuery);
          //console.log("debug Here!");
          //let deliverMsg = [cityQuery,false,city4Now[2]];
          //setCity(deliverMsg);
          setPhotos(res);
          //console.log(res);
        }
      });

    }

      // loadData({
      //   url: photosUrl,
      //   onSuccess: res => {
      //     //console.log(cityQuery);
      //     //console.log("debug Here!");
      //     //let deliverMsg = [cityQuery,false,city4Now[2]];
      //     //setCity(deliverMsg);
      //     setPhotos(res);
      //   }
      // });

//    }else{
//      ;//only hide/unhide form.
//    }//if
      setOldSearchQuery(searchSet);//save current searchSet to state.


  }, [searchQuery, url]);
//}, [searchSet.keyWordsSet, url]);



  // let myBackgroundURL="";
  // let parser4BP="";

  function handleCopyrightDisplay(){
    //console.log("got clicked");
    dispatch({ type: 'UPDATE_INPUT', data: copyright,});
  }


  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  return (
    <div className="xxxxx divtest">
    <div className="grid ">
    { searchQuery ?
        photos.map(photo => {
          let ttt;
          switch(backgroundImageSize){
            case "regular":
              ttt = photo.urls.regular;
            break;
            case "small":
              ttt = photo.urls.small;
            break;
            case "full":
              ttt = photo.urls.full;
            break;
            default:
              ttt = photo.urls.regular;
          }
        return (
          <div key={photo.id} className="item">
            <img
            className="img "
            src={ttt}
            alt="If you read this, means background API is abnoral. Please try again later. If it's on big screen, it's take time to render."
            />
          </div>
          );
      }) : ""}
    </div>
    <footer className="myFooter">
    <p className="myFooterP"><span onClick={handleCopyrightDisplay}>✝︎ Copyright © 2020-21 ART_Project</span>
    {
      photos.map(photo => {
      return (
          <a className="footerA"
          target="_blank"
          href={photo.user.links.html}
          >Photo {photo.user.name}/Unsplash ©</a>
        );
      })
    }


    </p>
    </footer>
    </div>
  );
}
//{9.links.html}user.name  urls.raw

export default FetchBackground;
