import React, { useState,  useContext } from 'react';
import {useForm, Controller} from 'react-hook-form';
import { AppContext } from './App';

//https://itnext.io/passing-data-between-sibling-components-in-react-using-context-api-and-react-hooks-fce60f12629a
function VerseDisplay(props){

  //from App.js
  const {state, dispatch} = useContext(AppContext);


    return (
      <div>
        <h1>Foo</h1>
        <div>
          {state.grabbedText}
        </div>
      </div>
    );

}
// <FetchResult />



export default VerseDisplay;
