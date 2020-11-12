import React, { useState,  useContext } from 'react';
import {useForm} from 'react-hook-form';
import { AppContext } from './App';
import {countryData, chineseBooks} from './bookName';

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

  // let newChineseBooks;
  // function  renderOptions() {
  //         newChineseBooks.map((chineseBooks, index) => {
  //           return <option value={index}>{newChineseBooks}</option>;
  //           })
  //   }



    return (
      <div>
        <div className="testbox">
          <form action="/">
            <h4>Book</h4>
            <select name="book">
                {chineseBooks.map((e, key) => {
                    return <option key={key} value={e.value}>{e.name}</option>;
                })}
            </select>


            <h4>Feedback/Enquiry on<span>*</span></h4>
            <select>
              <option value=""></option>
              <option value="1">Credit and Debit Cards</option>
              <option value="2">Deposit</option>
              <option value="3">Housing and Renovation Loan</option>
              <option value="4">iBanking</option>
              <option value="5">Treasures</option>
            </select>
            <h4>Name<span>*</span></h4>
            <div className="title-block">
              <select>
                <option value="title" selected>Title</option>
                <option value="ms">Ms</option>
                <option value="miss">Miss</option>
                <option value="mrs">Mrs</option>
                <option value="mr">Mr</option>
              </select>
              <input className="name" type="text" name="name" placeholder="First" />
              <input className="name" type="text" name="name" placeholder="Last" />
            </div>
            <div className="btn-block">
              <button type="submit" href="/">Send Feedback</button>
            </div>
          </form>
        </div>


      </div>
    );

}



export default MyForm;
