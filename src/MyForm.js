import React, { useState,  useContext, useEffect } from 'react';
import {useForm, Controller} from 'react-hook-form';
import { AppContext } from './App';
import {bibleBooks} from './bookName0';
import ReactSelect from "react-select";
import bookOptions from "./constants/bookOptionsEng.js"; //English
import bookOptionsCht from "./constants/bookOptionsCht.js"; //Chinese
import bookOptionsJpn from "./constants/bookOptionsJpn.js"; //Japanese
import languageOptions from "./constants/languageOptions.js";
import bookVerses from "./constants/bookVerses.js";
//import FetchResult from './FetchResult';
import FetchBackground from './FetchBackground';



//let currentLanguageUserSelect="niv"; //default use niv.
//let currentBookUserSelect="John";
let defaultBibleVersion = bookOptions;

//let maxChapter = 105;

function MyForm(props){
  //from App.js
  const {state, dispatch} = useContext(AppContext);


  const [hideOrNot, sethideOrNot] = useState('testbox Display'); //form display
  const [languageSelected, setlanguageInUI] = useState('niv'); //langauge select


  const {register, handleSubmit, control, errors } = useForm({
    defaultValues:
    {
      "chapterNumber": 3,
      "verseStartNumber": 16,
      "verseEndNumber": 16,
      "bookSelect": {value:"Jhn",label:"John"},
      "languageSelect": {value: "niv", label: "English NIV"},
    }
  });



 function handleDisplay(){
  if(hideOrNot == "testbox Display"){
    sethideOrNot("testbox noDisplay");
    //fix hide/unhide form and cause background change.
    //dispatch({ type: 'UPDATE_BACKGROUND_ENABLE', data: false,});
  }
  else{
    sethideOrNot("testbox Display");
    //fix hide/unhide form and cause background change.
    //dispatch({ type: 'UPDATE_BACKGROUND_ENABLE', data: false,});
  }
 }//handleDisplay()


  const onSubmit = data =>{
    console.log(data);
    //整理一下輸入的資料
    //dispatch({ type: 'UPDATE_BACKGROUND_ENABLE', data: true,});

    setStateSuccess(data);
  }//onSubmit end.

  //const setStateSuccess = async (data,e)=>{
  async function setStateSuccess(data){
    //console.log("in setStateSuccess()");
    let queryData={
      language:"niv",
      bookName:"John",
      bookAbbreviation:"Jhn",
      chapter:"3",
      verseStart:"16",
      verseEnd:"16"
    };

    if(typeof state.selectedBook === 'undefined'){
      ;
    }else{
      //if(typeof data.bookSelect === 'undefined'){
      if(typeof state.selectedBook[0] === 'undefined'){
        queryData.bookName="1 Corinthians";
        queryData.bookAbbreviation="1Co"
      }else{
        // await setBookName(data.bookSelect.label);
        // await setBookAbbreviation(data.bookSelect.value);
        //queryData.bookName=data.bookSelect.searchKey;
        //queryData.bookAbbreviation=data.bookSelect.value;
        //selectedBook
        queryData.bookName=state.selectedBook[0];
        queryData.bookAbbreviation=state.selectedBook[1];
      }

    }//if, solve no selection and just click search.

    // if(typeof data.languageSelect === 'undefined'){
    //   queryData.language="niv";
    // }else{
    //   // await setLanguage(data.languageSelect.value);
    //   queryData.language=data.languageSelect.value;
    // }

    if(typeof languageSelected === 'undefined'){
      queryData.language="niv";
    }else{
      // await setLanguage(data.languageSelect.value);
      queryData.language=languageSelected;
    }


    // await setChapter(data.chapterNumber);
    queryData.chapter=data.chapterNumber;

    if(parseInt(data.verseStartNumber) <= parseInt(data.verseEndNumber)){
      // await setVerseStart(data.verseStartNumber);
      // await setVerseEnd(data.verseEndNumber);
      queryData.verseStart=parseInt(data.verseStartNumber);
      queryData.verseEnd=parseInt(data.verseEndNumber);

    }else{
      // await setVerseStart(data.verseEndNumber);
      // await setVerseEnd(data.verseStartNumber);
      queryData.verseStart=parseInt(data.verseEndNumber);
      queryData.verseEnd=parseInt(data.verseStartNumber);
    }

    dispatch({ type: 'UPDATE_SEARCH', data: queryData,});

  }//setStateSuccess end.


async function languageChange(selectedOption){
  //console.log(`Option selected:`, selectedOption);
  await setlanguageInUI(selectedOption.value);
  //console.log(state.searchBibleVersionQuery);

}

async function bookChange(selectedOption){
  //console.log(`Option selected:`, selectedOption);
  //maxChapter = selectedOption.chapter;
  dispatch({ type: 'UPDATE_BOOKCHAPTER', data: selectedOption.chapter,});
  //UPDATE_BOOKSELECT
  dispatch({ type: 'UPDATE_BOOKSELECT', data: [selectedOption.searchKey, selectedOption.value],});


}

async function chapterChanged(e){
  //console.log(e.target.value);
  let targetChapter = parseInt(e.target.value)-1;
  //console.log(state.selectedBook);
  let target = state.selectedBook[0];
  //
  let __FOUND = -1;
  for(let i=0; i<bookVerses.length; i++) {
  	if(bookVerses[i].searchKey === target) {
  		// __FOUND is set to the index of the element
  		__FOUND = i;
  		break;
  	}
  }
  //console.log(bookVerses[__FOUND].value[targetChapter]);
  dispatch({ type: 'UPDATE_MAXVERSE', data: bookVerses[__FOUND].value[targetChapter],});


}

useEffect(() => {
  if (languageSelected) {
    // Make API call to /beer
    //console.log(languageSelected);
    switch(languageSelected){
      case 'cut':
        defaultBibleVersion = bookOptionsCht;
      break;
      case 'cnt':
        defaultBibleVersion = bookOptionsCht;
      break;
      case 'niv':
        defaultBibleVersion = bookOptions;
      break;
      case 'glm':
        defaultBibleVersion = bookOptions;
      break;
      case 'kjv':
        defaultBibleVersion = bookOptions;
      break;
      case 'jcl':
        defaultBibleVersion = bookOptionsJpn;
      break;
      case 'jco':
        defaultBibleVersion = bookOptionsJpn;
      break;

      default:
        defaultBibleVersion = bookOptions;
    }//switch
    //console.log(defaultBibleVersion);
    //below line is force re-render MyForm() only.
    dispatch({ type: 'UPDATE_BIBLEBOOKLANGUAGE', data: defaultBibleVersion,});
  } else {
    // Throw error 404, beer not found
  }
}, [languageSelected]);


//return <option key={key} value={e.value}>{e.name}</option>;
//            <h4>Language<span>*</span></h4>
//            <h4>Chapter and Verse<span>*</span></h4>
//      <FetchBackground />

    return (
      <div>
      <FetchBackground />
      <section>
      <h1 className="grabePhrase" onClick={handleDisplay}>🔍</h1>
      </section>

        <div className={hideOrNot}>
          <form onSubmit={handleSubmit(onSubmit)}>

            <section>
              <label>Language<span>*</span></label>
              <ReactSelect
                id="languageop"
                options={languageOptions}
                multi={true}
                onChange={languageChange}
                value={languageOptions.value}
                defaultValue={{value: "niv", label: "English NIV"}}
                name = "testing"
              />
            </section>

            <section>
              <label>Book<span>*</span></label>
              <ReactSelect
                id="bookop"
                options={defaultBibleVersion}
                multi={true}
                onChange={bookChange}
                value={defaultBibleVersion.value}
                defaultValue={{value:"Jhn",label:"John"}}
                name = "testing"
              />
            </section>



            <div className="item">
              <p>Chapter</p>
              <input type="number" step="1" min="1" max={state.changedMaxChapter} onChange={chapterChanged} name="chapterNumber" ref={register({ required: true })} />
            </div>
            <div className="item">
              <p>Verse Start</p>
              <input type="number" step="1" min="1" max={state.changedMaxVerse} name="verseStartNumber" ref={register({ required: true })} />
            </div>
            <div className="item">
              <p>Verse End</p>
              <input type="number" step="1" min="1" max={state.changedMaxVerse} name="verseEndNumber" ref={register({ required: true })} />
            </div>

            <div className="btn-block">
              <button type="submit" >Search</button>
            </div>
          </form>
        </div>


      </div>
    );

}
// <FetchResult />



export default MyForm;
