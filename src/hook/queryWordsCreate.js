
function queryWordsCreate(verse, keywordsDictionary){
  if(verse.length){
    console.log(verse);
    console.log(keywordsDictionary);
  //x => verse.includes(x)
    let includingKeywords=[];
    let finalString="";
    keywordsDictionary.forEach(myFun);

    function myFun(x){
      if(verse.includes(x)){
        includingKeywords.push(x);
        finalString = includingKeywords.join(" ");
      }else{
        ;
      }
    }
    console.log(finalString);
    if(finalString){
      return finalString;
    }else{
      return verse;
    }


  }else{
    return verse;
  }
}

export default queryWordsCreate;
