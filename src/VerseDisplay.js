import React, { useState,  useContext } from 'react';
import {useForm, Controller} from 'react-hook-form';
import { AppContext } from './App';


function VerseDisplay(props){

  //from App.js
  const {state, dispatch} = useContext(AppContext);


    return (
      <div>
        <h1>我是Trina</h1>
        <div>
          {state.grabbedText}
        </div>
      </div>
    );

}
// <FetchResult />



export default VerseDisplay;
