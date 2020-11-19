import React, { useState,  useContext } from 'react';
import {useForm, Controller} from 'react-hook-form';
import { AppContext } from './App';
import {bibleBooks} from './bookName0';
import ReactSelect from "react-select";
import bookOptions from "./constants/bookOptionsEng.js"; //英文
//import bookOptions from "./constants/bookOptionsCht.js"; //中文
import languageOptions from "./constants/languageOptions.js";
import FetchBackground from './FetchBackground';
import FetchResult from './FetchResult';






function MyForm(props){
  //from App.js
  const {state, dispatch} = useContext(AppContext);

  //use in this file.
  const [language, setLanguage] = useState('niv'); //for input data
  const [book, setBookName] = useState('John');
  const [bookAbbreviation,setBookAbbreviation ] =useState('Jhn');
  const [chapter,setChapter] = useState('3');
  const [verseStart,setVerseStart] = useState('16');
  const [verseEnd,setVerseEnd] = useState('16');

  const [hideOrNot, sethideOrNot] = useState('testbox Display'); //form display


  const {register, handleSubmit, control, errors } = useForm({
    defaultValues:
    {
      "chapterNumber": chapter,
      "verseStartNumber": verseStart,
      "verseEndNumber": verseEnd,
      "bookSelect": book,
      "languageSelect": language
    }
  });



  const api_call = async (e) => {
    if(book!=="cnt" && book!=="nrsv" && book!=="akjv"){
      // 我們預設從這個網站取得經節。沒包含最後三個。要用另一個處理。
      //url = "https://cors-anywhere.herokuapp.com/http://ibibles.net/quote.php?bbe-John/03:16-13";
      const queryUrl = `https://cors-anywhere.herokuapp.com/http://ibibles.net/quote.php?
        ${language}-${book}/${chapter}:${verseStart}-${verseEnd}`;
      console.log(queryUrl);

      await fetch(queryUrl,{
          'method': 'GET',
          'headers': {
            //'accept': 'application/json'
          }
      })
        .then(response => response.text())// not .json at this website. because it reutrn HTML.
        .then((responseData) => {
          console.log(responseData);
          //becuase we got HTML, need to extract what we need and save it.
          //below is an example:
          // <!doctype html>
          // <html>
          // <head>
          // <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
          // <title>Bible Quote</title>
          // </head>
          // <body bgcolor="#e0e0e0">
          // <small>1:13</small> For he has rescued us from the dominion of darkness and brought us into the kingdom of the Son he loves, <br>
          // </body>
          // </html>
          const extractFirstPlace = responseData.indexOf("<small>");
          const extractFinalPlace = responseData.indexOf("</body>");
          const extracted = responseData.substring(extractFirstPlace,extractFinalPlace);
          console.log(extracted);
          //save to context for other components use.
          dispatch({ type: 'UPDATE_INPUT', data: extracted,});

          return responseData;
          //this.setState({ author: responseData});
        })
        .catch(err =>{
          console.log(err);
        });

      //.catch(function(error){console.log(`"No Data at this location. ${error}"`);});
      //return response;

    }else{
      //用第二種方式取得資料
      //參考FetchREsult.js 的url2 or url. 放入TODO.
    }


}//api_call

 function handleDisplay(){
  if(hideOrNot == "testbox Display")
    sethideOrNot("testbox noDisplay");
  else
    sethideOrNot("testbox Display");
 }//handleDisplay()


  const onSubmit = data =>{
    console.log(data);
    //整理一下輸入的資料
    if(typeof data.bookSelect === 'undefined'){
      ;
    }else{
      setBookName(data.bookSelect.label);
      setBookAbbreviation(data.bookSelect.value);
    }

    if(typeof data.languageSelect === 'undefined'){
      ;
    }else{
      setLanguage(data.languageSelect.value);
    }

    setChapter(data.chapterNumber);

    if(data.verseStartNumber <= data.verseEndNumber){
      setVerseStart(data.verseStartNumber);
      setVerseEnd(data.verseEndNumber);
    }else{
      setVerseStart(data.verseEndNumber);
      setVerseEnd(data.verseStartNumber);
    }


    const temp1 = api_call();
    temp1.then(function(result) {  //因為temp1是 promise狀態, 需要用then取出
   // console.log(result.main.temp);
   // console.log(result.main.feels_like);
      console.log(result);

 });

//    let url = 'https://api.scripture.api.bible/v1/bibles/'



  }//onSubmit end.



//return <option key={key} value={e.value}>{e.name}</option>;
//            <h4>Language<span>*</span></h4>
//            <h4>Chapter and Verse<span>*</span></h4>

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
