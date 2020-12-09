
function queryWordsCreate(verse, keywordsDictionary){
  if(verse.length){
    //console.log(verse); //from VerseDisplay.js
    //console.log(keywordsDictionary);//from words.js
  //x => verse.includes(x)
    let includingKeywords=[];
    let finalString="";
    keywordsDictionary.forEach(checkingInclude);

    function checkingInclude(x){
      if(verse.includes(x)){
        includingKeywords.push(x);
//        finalString = includingKeywords.join(" ");
      }else{
        ;
      }
    }
  //from now, includingKeywords array has all the keywords we need.
  //Random select one from this array if the length of this array is >=2.
  console.log(includingKeywords);
  if(includingKeywords.length>=2){
    finalString = includingKeywords[Math.floor(Math.random()*includingKeywords.length)];
  }else{
    finalString = includingKeywords[0];
  }

  //finalString = includingKeywords.join(" "); //it's for testing.
  if(finalString === "God"){
    finalString = "Jesus"; //if we just search God, other strange picture is coming.
  }else{
    ;
  }
  console.log(finalString);
  let returnObj={final:"",keyWordsSet:""};
  returnObj.keyWordsSet = includingKeywords;
    if(finalString){
      returnObj.final=finalString;
      //return finalString;
      return returnObj;
    }else{
      returnObj.final=verse;
      //return verse;
      return returnObj;
    }


  }else{
    return verse;
  }
}

export default queryWordsCreate;
