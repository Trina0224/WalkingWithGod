import React, { useState,  useContext } from 'react';
import {useForm, Controller} from 'react-hook-form';
import { AppContext } from './App';
import './VerseDisplay.css';


//https://itnext.io/passing-data-between-sibling-components-in-react-using-context-api-and-react-hooks-fce60f12629a
function VerseDisplay(props){

  //from App.js
  const {state, dispatch} = useContext(AppContext);
  //state.grabbedText example:
  //<small>1:1</small> これはソロモンの雅歌なり <br>
  //<small>1:2</small> ねがはしきは彼その口の接吻をもて我にくちつけせんことなり 汝の愛は酒よりもまさりぬ <br>
  //<small>1:3</small> なんぢの香膏は其香味たへに馨しくなんぢの名はそそがれたる香膏のごとし 是をもて女子等なんぢを愛す <br>
  //Ref:jcl-Song of Songs/1:1-3
  //xxx.replaceAll() with RegExp()
  let noSmallTag = state.grabbedText.replaceAll("<small>","@");
  noSmallTag = noSmallTag.replaceAll("</small>","@");
  var regEx = new RegExp("@.*@", "g"); //we must use RegExp() to create regEx. or JS is not working.
  noSmallTag = noSmallTag.replaceAll(regEx,"");
  noSmallTag = noSmallTag.replaceAll("<br>"," ");
  noSmallTag = noSmallTag.replaceAll("Ref:","✝︎ ");


  console.log(noSmallTag);
//          {state.grabbedText}

    return (
      <div className="dim">
      <div className="pueDIV sticky">
        <h1 className="Hero"><span className="highlight">{noSmallTag}</span></h1>
      </div>
      </div>
    );

}
// <FetchResult />



export default VerseDisplay;
