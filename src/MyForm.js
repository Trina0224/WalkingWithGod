import React, { useState,  useContext, useEffect } from 'react';
import {useForm, Controller} from 'react-hook-form';
import { AppContext } from './App';
import {bibleBooks} from './bookName0';
import ReactSelect from "react-select";
import bookOptions from "./constants/bookOptionsEng.js"; //英文
import bookOptionsCht from "./constants/bookOptionsCht.js"; //中文
import languageOptions from "./constants/languageOptions.js";
//import FetchResult from './FetchResult';
import FetchBackground from './FetchBackground';



//let currentLanguageUserSelect="niv"; //default use niv.
//let currentBookUserSelect="John";
let defaultBibleVersion = bookOptions;


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
  if(hideOrNot == "testbox Display")
    sethideOrNot("testbox noDisplay");
  else
    sethideOrNot("testbox Display");
 }//handleDisplay()


  const onSubmit = data =>{
    console.log(data);
    //整理一下輸入的資料
    setStateSuccess(data);





  }//onSubmit end.

  //const setStateSuccess = async (data,e)=>{
  async function setStateSuccess(data){
    console.log("in setStateSuccess()");
    let queryData={
      language:"",
      bookName:"",
      bookAbbreviation:"",
      chapter:"",
      verseStart:"",
      verseEnd:""
    };
    if(typeof data.bookSelect === 'undefined'){
      queryData.bookName="1 Corinthians";
      queryData.bookAbbreviation="1Co"
    }else{
      // await setBookName(data.bookSelect.label);
      // await setBookAbbreviation(data.bookSelect.value);
      queryData.bookName=data.bookSelect.label;
      queryData.bookAbbreviation=data.bookSelect.value;
    }

    if(typeof data.languageSelect === 'undefined'){
      queryData.language="niv";
    }else{
      // await setLanguage(data.languageSelect.value);
      queryData.language=data.languageSelect.value;
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

  // function languageChange(){
  //   console.log("lanugage changed.");
  // }

async function languageChange(selectedOption){
  console.log(`Option selected:`, selectedOption);
  await setlanguageInUI(selectedOption.value);
  //dispatch({ type: 'UPDATE_BIBLEVERSION', data: selectedOption.value,});
  //currentLanguageUserSelect=selectedOption.value;
  //console.log(currentLanguageUserSelect);
  console.log(state.searchBibleVersionQuery);

}

async function bookChange(selectedOption){
  console.log(`Option selected:`, selectedOption);
  //await setlanguageInUI(selectedOption.value);
  //currentBookUserSelect=selectedOption.label;
  //console.log(currentBookUserSelect);

}

useEffect(() => {
  if (languageSelected) {
    // Make API call to /beer
    console.log(languageSelected);
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
        defaultBibleVersion = bookOptions;
      break;
      case 'jco':
        defaultBibleVersion = bookOptions;
      break;

      default:
        defaultBibleVersion = bookOptions;
    }//switch
    console.log(defaultBibleVersion);
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
              <Controller
                as={ReactSelect}
                options={languageOptions}
                name="languageSelect"
                isClearable
                control={control}
              />
            </section>

            <section>
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
              <Controller
                as={ReactSelect}
                options={defaultBibleVersion}
                name="bookSelect"
                isClearable
                control={control}
              />
            </section>

            <section>
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
              <input type="number" step="1" min="1" name="chapterNumber" ref={register({ required: true })} />
            </div>
            <div className="item">
              <p>Verse Start</p>
              <input type="number" step="1" min="1" name="verseStartNumber" ref={register({ required: true })} />
            </div>
            <div className="item">
              <p>Verse End</p>
              <input type="number" step="1" min="1" name="verseEndNumber" ref={register({ required: true })} />
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
