// ES Modules syntax
import React,{useContext, useState, useEffect, useRef} from 'react';
import fetch from 'node-fetch';

import useFetch from './hook/useFetch.js';

import request from 'request';


//因為useFetch只能用在component level, 不然會出現 React error, 所以多建立這個component
function FetchResult(){

    //const url = "https://api.football-data.org/v2/competitions/2014/standings";
    const url = "https://api.scripture.api.bible/v1/bibles";
    fetch(url, {
      method: "GET",
      headers: {
        //"X-Auth-Token": "ef72570ff371408f9668e414353b7b2e",
        'api-key': process.env.REACT_APP_APIBIBLE_API_KEY,
        'accept': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(function(data) {
        console.log(data);

        // let output = "";
        // output += `<p>Started on ${data.season.startDate}, ending on ${data.season.endDate}</p>`;
        //
        // let overallTable = "";
        //
        // for (let i = 0; i < data.standings[0].table.length; i++) {
        //   overallTable += `${data.standings[0].table[i].team.name}
        //   ${data.standings[0].table[i].points}`;
        // }
        //
        // console.log(output);
        // console.log(overallTable);
      })
      .catch(function(error) {
        console.log(error);
      });

      const url2 = "https://cors-anywhere.herokuapp.com/https://getbible.net/json?passage=Acts15:1-5&version=akjv"
      //proxy法 要加上   "proxy": "https://getbible.net/", 到package.json, 大約行26.有改package都要重新開程式
      //const url2 = "json?passage=Acts15:1-5&version=akjv";
      //改用jsonp XX
      //const url2 = "https://getbible.net/json?passage=Acts15:1-5&version=akjv";

      //https://getbible.net/json?passage=Acts%2015:1-5,%2010,%2015&version=aov
      //換個地點
      //const url2 = "https://cors-anywhere.herokuapp.com/http://ibibles.net/quote.php?cut-1 Samuel/03:15-03:17"
      fetch(url2, {
        method: "GET",
        headers: {
          //"X-Auth-Token": "ef72570ff371408f9668e414353b7b2e",
          //'api-key': process.env.REACT_APP_APIBIBLE_API_KEY,
          //'accept': 'application/json'
          //'Connection': 'keep-alive',
          //'Access-Control-Allow-Origin': 'https://localhost:3000/'
          //'Host': 'https://getbible.net/json'
          //"Access-Control-Allow-Origin" : "*",
          //"Accept" : "*/*"
          //'Content-Type': 'application/json',
          //'Accept': 'application/json'
        }
      })
      .then(resp => resp.text())
      //.then(resp => resp.json())
      .then((text) => {
        console.log(text);
      })
      //.then(res => res.json())
      .then(function(data) {
        console.log(data);
      })
      .catch(function(error) {
        console.log(error);
      });


      //換個地點
      const url3 = "https://cors-anywhere.herokuapp.com/http://ibibles.net/quote.php?cut-1 Samuel/03:15-03:17"
      fetch(url3, {
        method: "GET",
        headers: {
          //'Content-Type': 'application/json',
          //'Accept': 'application/json'
        }
      })
      .then(resp => resp.text())
      //.then(resp => resp.json())
      .then((text) => {
        console.log(text);
      })
      .then(function(data) {
        console.log(data);
      })
      .catch(function(error) {
        console.log(error);
      });




  return (
    <div className="LOL">
    </div>
  );
}
//{9.links.html}user.name  urls.raw

export default FetchResult;
