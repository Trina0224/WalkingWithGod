import React, { useState,  useContext } from 'react';
import {useForm, Controller} from 'react-hook-form';
import { AppContext } from './App';
import {bibleBooks} from './bookName0';
import ReactSelect from "react-select";
import bookOptions from "./constants/bookOptionsEng.js"; //英文
import bookOptionsCht from "./constants/bookOptionsCht.js"; //中文
import languageOptions from "./constants/languageOptions.js";
//import FetchResult from './FetchResult';
import FetchBackground from './FetchBackground';






function MyForm(props){
  //from App.js
  const {state, dispatch} = useContext(AppContext);


  const [hideOrNot, sethideOrNot] = useState('testbox Display'); //form display


  const {register, handleSubmit, control, errors } = useForm({
    defaultValues:
    {
      "chapterNumber": 3,
      "verseStartNumber": 16,
      "verseEndNumber": 16,
      "bookSelect": "John",
      "languageSelect": "niv"
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
                onChange = {e =>{
                  console.log("input changed.");
                  return e[0].target.value;
                }}
              />
            </section>

            <section>
              <label>Book<span>*</span></label>
              <Controller
                as={ReactSelect}
                options={bookOptions}
                name="bookSelect"
                isClearable
                control={control}
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
