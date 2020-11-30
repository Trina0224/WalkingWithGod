# Issues  
1. Need to double click search.  <==
https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
The easy answer: useEffect instead useState.  
2. In REACT, if you see something undefined in object but you are sure it's right. The problem is from
react will run page two times and one is without data, so, we need to check the object is really exist.
In VerseDisplay.js, I put if(state.searchQuery) to prevent issue happen.


# Todos:  
1. other API search.   ok.
2. Modify webpage name and Favicon ok.  
3. background change  ok.
4. smart background change.  (can be better)
5. No matter which version BIBLE user select. We still need to extract from BBE. ok.
6. Using BBE to create dictionary for AI.
7. CopyRight Page.  
8. Clean non-necessary console.log().  
9. no verse returned processing. ok.  
10. book name in different language.  
11. control book chapter and max vase number.  
12. Default generate random verses.  
13. Default book, language value. ok.

MEMO: work on this link:
https://codesandbox.io/s/jrze53pqr?file=/index.js:1092-1102
because there is no onChange for Controller... = ="
BTW, because react-select cannot bind to onSubmit of Form, need to create state for it.
11/27 I tried state and context, both cannot reflect result at the same cycle, need twice. I don't like it.
Change to use global variable.  --> X
Use useEffect() can solve this issue. But still go back no re-render issue. Solved by dispatch.

下次開始改中文日文書也可以搜尋，必須多加欄位給英文用。搜尋API只能用英文


https://cors-anywhere.herokuapp.com/
https://getbible.net/json?passage=Gen 1:1-5&version=cnt
https://cors-anywhere.herokuapp.com/https://getbible.net/json?passage=Gen 1:1-5&version=cnt
