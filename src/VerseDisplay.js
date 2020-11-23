import React, { useState,  useContext } from 'react';
import {useForm, Controller} from 'react-hook-form';
import { AppContext } from './App';
import './VerseDisplay.css';


//https://itnext.io/passing-data-between-sibling-components-in-react-using-context-api-and-react-hooks-fce60f12629a
function VerseDisplay(props){

  //from App.js
  const {state, dispatch} = useContext(AppContext);
  //console.log(state.searchQuery);


  //API to get verse.
  const api_call = async (e) => {
    //console.log(state.searchQuery);
    const data= state.searchQuery;
    //console.log(typeof datat);
    if(state.searchQuery){
      console.log(data.language);
      if(data.language!=="cnt" &&
        data.language!=="nrsv" &&
        data.language!=="akjv"){
        // 我們預設從這個網站取得經節。沒包含最後三個。要用另一個處理。
        //url = "https://cors-anywhere.herokuapp.com/http://ibibles.net/quote.php?bbe-John/03:16-13";
        const queryIndex = `${data.language}-${data.bookName}/${data.chapter}:${data.verseStart}-${data.verseEnd}`;
        const queryUrl = `https://cors-anywhere.herokuapp.com/http://ibibles.net/quote.php?${queryIndex}`;
        console.log(queryUrl);

        await fetch(queryUrl,{
            'method': 'GET',
            'headers': {
              //'accept': 'application/json'
            }
        })
          .then(response => response.text())// not .json at this website. because it reutrn HTML.
          .then((responseData) => {
            //console.log(responseData);
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
            //console.log(extracted);
            const data4Reducer = `${extracted} Ref:${queryIndex}`; //add index data for display work easier.
            console.log(data4Reducer);
            //save to context for other components use.
            dispatch({ type: 'UPDATE_INPUT', data: data4Reducer,});

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

    }else{

    }//else,if(state.searchQuery)



  }//api_call






  const temp1 = api_call();
  temp1.then(function(result) {  //因為temp1是 promise狀態, 需要用then取出
 // console.log(result.main.temp);
 // console.log(result.main.feels_like);
    console.log(result);

  });

//    let url = 'https://api.scripture.api.bible/v1/bibles/'



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
