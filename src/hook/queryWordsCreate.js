
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
  if(includingKeywords.length==0){
    includingKeywords.push("bible");//bible is default word.
    //random select one keyword.
//    for ( let i = 0, n = keywordsDictionary.length; i < 1; ++i) {
    //includingKeywords.push(keywordsDictionary[Math.floor(Math.random() * keywordsDictionary.length)]);
    //console.log(includingKeywords);
//    }

  }
  if(includingKeywords.length>=2){
    finalString = includingKeywords[Math.floor(Math.random()*includingKeywords.length)];
  }else{
    finalString = includingKeywords[0];
  }

  //finalString = includingKeywords.join(" "); //it's for testing.
  switch(finalString){
    case 'God':
      finalString = 'Jesus'; //if we just search God, other strange picture is coming.
    break;
    case 'feebly burning light':
      finalString = 'candle'; //actually I hope i can also use 'candle light'
    break;
    case 'crushed stem':
      finalString = 'reed';
    break;
    case 'wealth':
      finalString = 'treasure';
    default:
  }

  // if(finalString === "God"){
  //   finalString = "Jesus"; 
  // }else{
  //   ;
  // }
  console.log(finalString);
  let returnObj={final:"",keyWordsSet:""};
  if(includingKeywords.length === 1){ //means only one words only, we can refalsh background everytime.
  //  console.log(includingKeywords);
  //  returnObj.keyWordsSet = includingKeywords;
  //}else{
  //   //random select keywords to put into keyWordsSet.
    let retVal=[];
    for ( let i = 0, n = keywordsDictionary.length; i < 2; ++i) {
        retVal.push(keywordsDictionary[Math.floor(Math.random() * n)]);
    }
    console.log(retVal);
    returnObj.keyWordsSet = retVal; // create random sets for dummy usage.-->in order to fix no background query issue.
  }
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
  }//if(verse.length)
}

export default queryWordsCreate;
