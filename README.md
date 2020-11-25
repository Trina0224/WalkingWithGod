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

https://cors-anywhere.herokuapp.com/
https://getbible.net/json?passage=Gen 1:1-5&version=cnt
https://cors-anywhere.herokuapp.com/https://getbible.net/json?passage=Gen 1:1-5&version=cnt
