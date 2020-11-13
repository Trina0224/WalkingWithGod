import React, { useState,  useContext } from 'react';
import {useForm, Controller} from 'react-hook-form';
import { AppContext } from './App';
import {bibleBooks} from './bookName0';
import ReactSelect from "react-select";
import options from "./constants/reactSelectOptions";
import languageOptions from "./constants/languageOptions.js";

//import {countryData, bibleBooks} from './bookName';



//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
//import FetchBackground from './FetchBackground'

//import ContextBP from './store/City_context.js'

//import {helpMeTranslate} from './translate.js'
//import { googleTranslate } from "./utils/googleTranslate";
//import cookie from "react-cookies";

//import LanguageDetect from 'languagedetect';
//const LanguageDetect = require('languagedetect');
//const lngDetector = new LanguageDetect();


// <form onSubmit={this.mySubmitHandler}>
//<form action="/" method="post" >
//https://codesandbox.io/s/tutorial-base-done-g2n24?file=/src/index.js






function MyForm(props){
  const [book, setBookName] = useState('');
  let chapters = [];

  const {register, handleSubmit, control, errors } = useForm({
    defaultValues:
    {
      "languageSelect":"cnt",
      "book":"0",
      "chapterNumber":"3",
      "verseStartNumber":"16",
      "verseEndNumber":"16",
    }
  });

  const onSubmit = data =>{
    console.log(data);
  }

  // let newChineseBooks;
  // function  renderOptions() {
  //         newChineseBooks.map((chineseBooks, index) => {
  //           return <option value={index}>{newChineseBooks}</option>;
  //           })
  //   }


  // function handleChange(e) {
  //   console.log(e.target.value);
  // }
  //            <select name="book" onChange={handleChange}>




//return <option key={key} value={e.value}>{e.name}</option>;
//            <h4>Language<span>*</span></h4>

    return (
      <div>
        <div className="testbox">
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

            <h4>Book<span>*</span></h4>
            <select name="book" onChange={e => setBookName(e.target.value)}>
                {bibleBooks.map((e, key) => {
                    return <option key={key} value={key}>{e.nameTW}</option>;
                })}
            </select>


            <h4>Chapter and Verse<span>*</span></h4>
            <div className="item">
              <p>Chapter</p>
              <input type="number" step="1" name="chapterNumber" ref={register({ required: true })} />
            </div>
            <div className="item">
              <p>Verse Start</p>
              <input type="number" step="1" name="verseStartNumber" ref={register({ required: true })} />
            </div>
            <div className="item">
              <p>Verse End</p>
              <input type="number" step="1" name="verseEndNumber" ref={register({ required: true })} />
            </div>

            <div className="btn-block">
              <button type="submit" >Search</button>
            </div>
          </form>
        </div>


      </div>
    );

}



export default MyForm;
