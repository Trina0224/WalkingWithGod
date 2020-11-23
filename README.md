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
3. background change  
4. smart background change.  
5. Book name to capital.


https://cors-anywhere.herokuapp.com/
https://getbible.net/json?passage=Gen 1:1-5&version=cnt
https://cors-anywhere.herokuapp.com/https://getbible.net/json?passage=Gen 1:1-5&version=cnt
