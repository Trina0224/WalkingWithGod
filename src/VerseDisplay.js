//This module is for fetching verses via API.
import React, { useState,  useContext } from 'react';
//simport {useForm, Controller} from 'react-hook-form';
import { AppContext } from './App';
import './VerseDisplay.css';


//https://itnext.io/passing-data-between-sibling-components-in-react-using-context-api-and-react-hooks-fce60f12629a
function VerseDisplay(props){

  //from App.js
  const {state, dispatch} = useContext(AppContext);
  const [changeDisplayLocation, setChangeDisplayLocation] = useState('Hero locationTopRight'); //form display
  const [changeDimLocation, setChangeDimLocation] = useState('dim dimBlackTopRight'); //form display

  //console.log(state.searchQuery);


  //API to get verse.
  const api_call = async (e) => {
    //console.log(state.searchQuery);
    const data= state.searchQuery;
    //console.log(typeof datat);

    if(state.searchQuery){
      //console.log(data.language);

      //first API query is for BBE only.
      const bbeVersionIndex = `bbe-${data.bookName}/${data.chapter}:${data.verseStart}-${data.verseEnd}`;
      //const bbeQueryUrl = `https://cors-anywhere.herokuapp.com/http://ibibles.net/quote.php?${bbeVersionIndex}`;
      const bbeQueryUrl = `https://evening-bayou-31975.herokuapp.com/http://ibibles.net/quote.php?${bbeVersionIndex}`;
      console.log(bbeQueryUrl);

      await fetch(bbeQueryUrl,{
          'method': 'GET',
          'headers': {
            //'accept': 'application/json'
          }

      })
        .then(response => response.text())// not .json at this website. because it reutrn HTML.
        .then((responseData) => {
          const extractFirstPlace = responseData.indexOf("<small>");
          const extractFinalPlace = responseData.indexOf("</body>");
          const extracted = responseData.substring(extractFirstPlace,extractFinalPlace);
          //console.log(extracted);

          let noSmallTag = extracted.replaceAll("<small>","@");
          noSmallTag = noSmallTag.replaceAll("</small>","@");
          var regEx = new RegExp("@.*@", "g"); //we must use RegExp() to create regEx. or JS is not working.
          noSmallTag = noSmallTag.replaceAll(regEx,"");
          noSmallTag = noSmallTag.replaceAll("<br>"," ");
          //console.log(noSmallTag);

          dispatch({ type: 'UPDATE_BACKGROUNDKEYWORD', data: noSmallTag,});//it's only for background search.

          //this.setState({ author: responseData});
        })
        .catch(err =>{
          console.log(err);
        });



      //below is depend on whcih book version we selected. cnt, nrsv and akjv need API2, other
      //using ibible is enough.

      if(data.language!=="cnt" &&
        data.language!=="nrsv" &&
        data.language!=="akjv"){
        // We got verse from here for default.
        //url = "https://cors-anywhere.herokuapp.com/http://ibibles.net/quote.php?bbe-John/03:16-13";
        const queryIndex = `${data.language}-${data.bookName}/${data.chapter}:${data.verseStart}-${data.verseEnd}`;
        //const queryUrl = `https://cors-anywhere.herokuapp.com/http://ibibles.net/quote.php?${queryIndex}`;
        const queryUrl = `https://evening-bayou-31975.herokuapp.com/http://ibibles.net/quote.php?${queryIndex}`;
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
            //console.log(data4Reducer);
            //state.grabbedText example:
            //<small>1:1</small> これはソロモンの雅歌なり <br>
            //<small>1:2</small> ねがはしきは彼その口の接吻をもて我にくちつけせんことなり 汝の愛は酒よりもまさりぬ <br>
            //<small>1:3</small> なんぢの香膏は其香味たへに馨しくなんぢの名はそそがれたる香膏のごとし 是をもて女子等なんぢを愛す <br>
            //Ref:jcl-Song of Songs/1:1-3
            //xxx.replaceAll() with RegExp()

            let noSmallTag = data4Reducer.replaceAll("<small>","@");
            noSmallTag = noSmallTag.replaceAll("</small>","@");
            var regEx = new RegExp("@.*@", "g"); //we must use RegExp() to create regEx. or JS is not working.
            noSmallTag = noSmallTag.replaceAll(regEx,"");
            noSmallTag = noSmallTag.replaceAll("<br>"," ");
            noSmallTag = noSmallTag.replaceAll("Ref:","✝︎ ");


            //save to context for other components use.
            //dispatch({ type: 'UPDATE_INPUT', data: data4Reducer,});
            dispatch({ type: 'UPDATE_INPUT', data: noSmallTag,});
            // dispatch({ type: 'UPDATE_SEARCH_CLICKED', data: false,}); //only successfully display verse and can clean this flag.

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
        //passage=Acts15:1-5&version=akjv
        const queryIndex = `${data.bookAbbreviation} ${data.chapter}:${data.verseStart}-${data.verseEnd}&version=${data.language}`;
        //const queryUrl = `https://cors-anywhere.herokuapp.com/https://getbible.net/json?passage=${queryIndex}`;
        const queryUrl = `https://evening-bayou-31975.herokuapp.com/https://getbible.net/json?passage=${queryIndex}`;
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
            // we got something like below:
            //remove '()' and it's a JSON.
            //(
            //{"book":[{
            //  "book_ref":"Jn",
            //  "book_name":"John",
            //  "book_nr":"43",
            //  "chapter_nr":"3",
            //  "chapter":{
            //    "16":{
            //      "verse_nr":"16",
            //      "verse":"\u201c\u3000\u795e\u611b\u4e16\u4eba\uff0c\u751a\u81f3\u628a\u4ed6\u7684\u7368\u751f\u5b50\u8cdc\u7d66\u4ed6\u5011\uff0c\u53eb\u4e00\u5207\u4fe1\u4ed6\u7684\uff0c\u4e0d\u81f3\u6ec5\u4ea1\uff0c\u53cd\u5f97\u6c38\u751f\u3002\r\n"
            //    }
            //  }
            //}],
            //"direction":"LTR",
            //"type":"verse",
            //"version":"cnt"}
            //);

            let cleanData = responseData.replaceAll("(","");
            cleanData = cleanData.replaceAll(")","");
            //remove the last ';' use slice(0,-1) is the easist.
            cleanData = cleanData.slice(0,-1);
            //console.log(cleanData);
            let obj = JSON.parse(cleanData);
            //console.log(obj);
            if(obj){
              //from obj.book[0].chpater, we could get something like this:
              //16: {verse_nr: "16", verse: "And I will make your seed as the dust of the earth…e earth, then shall your seed also be numbered."}
              //17: {verse_nr: 17, verse: "Arise, walk through the land in the length of it a…n the breadth of it; for I will give it to you."}
              //console.log(obj.book[0].chapter);
              //console.log(obj.book[0].chapter.[16].verse);
              let displayString="";
              for(let i=data.verseStart; i<=data.verseEnd;i++){
                displayString = displayString.concat(obj.book[0].chapter.[i].verse);
              }
              //expand final substring
              let tempsub= `✝︎ ${data.language}-${data.bookName}/${data.chapter}:${data.verseStart}-${data.verseEnd}`;
              displayString = displayString.concat(tempsub);
              //console.log(tempsub);
              //console.log(displayString);
              dispatch({ type: 'UPDATE_INPUT', data: displayString,});
              // dispatch({ type: 'UPDATE_SEARCH_CLICKED', data: false,}); //only successfully display verse and can clean this flag.




            }else{
              ;
            }//if(obj)

            return responseData;
            //this.setState({ author: responseData});
          })
          .catch(err =>{
            console.log(err);
          });


      }

    }else{
      ;
    }//else,if(state.searchQuery)



  }//api_call






  const temp1 = api_call();
  temp1.then(function(result) {  //因為temp1是 promise狀態, 需要用then取出
 // console.log(result.main.temp);
 // console.log(result.main.feels_like);
  //  console.log(result);

  });

//    let url = 'https://api.scripture.api.bible/v1/bibles/'

  function handleDisplay(){
    console.log("Get clicked on verse");
    switch (changeDisplayLocation){
      case "Hero locationTopRight":
        setChangeDisplayLocation("Hero locationBotRight");
        setChangeDimLocation("dim dimBlackBotRight");
        break;
      case "Hero locationBotRight":
        setChangeDisplayLocation("Hero locationBotLeft");
        setChangeDimLocation("dim dimBlackBotLeft");
        break;
      case "Hero locationBotLeft":
        setChangeDisplayLocation("Hero locationTopLeft");
        setChangeDimLocation("dim dimBlackTopLeft");
        break;
      case "Hero locationTopLeft":
        setChangeDisplayLocation("Hero locationTopRight");
        setChangeDimLocation("dim dimBlackTopRight");
        break;
      default:
        setChangeDisplayLocation("Hero locationTopRight");
        setChangeDimLocation("dim dimBlackTopRight");
    }
  }//handleDisplay()



  let noSmallTag = state.grabbedText;

  //console.log(noSmallTag);
//          {state.grabbedText}

    return (
      <div className={changeDimLocation}>
      <div className="pueDIV sticky">
        <h1 className={changeDisplayLocation} onClick={handleDisplay} ><span className="highlight">{noSmallTag}</span></h1>
      </div>
      </div>
    );

}
// <FetchResult />



export default VerseDisplay;
