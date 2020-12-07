# Issues  
1. Need to double click search.  <==
https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
The easy answer: useEffect instead useState.  
2. In REACT, if you see something undefined in object but you are sure it's right. The problem is from
react will run page two times and one is without data, so, we need to check the object is really exist.
In VerseDisplay.js, I put if(state.searchQuery) to prevent issue happen.


# Todos:  
8. Clean non-necessary console.log(). ok. (Can do it again later)
9. no verse returned processing. ok.  ?? on checking
11. Default generate random famous verses.  
16. Bug, click hide/unhide and cause background change. ok. ??on checking  
17. Click on verses and can change display location on the screen.  
18. Can Also change shading location on the background.  
19. code clean.  
21. Design our own CORS server.

# Done:  
1. other API search.   ok.
2. Modify webpage name and Favicon ok.  
3. background change  ok.
4. smart background change.  (can be better)
5. No matter which version BIBLE user select. We still need to extract from BBE. ok.
6. Using BBE to create dictionary for background. ok.
7. CopyRight Page.  (ok, can be better)
10. book name in different language. ok.
12. Default book, language value. ok.  
13. Constraint chapter number ok.  
14. Constraint verse number. ok.  
15. Fix no select but just search issue.  ok. fixed by add "if(typeof state.selectedBook === 'undefined')"
20. Try submit to website, and check CORS issues. ok. Even on github pages, we still need CORS walk-around.  


MEMO: work on this link:
https://codesandbox.io/s/jrze53pqr?file=/index.js:1092-1102
because there is no onChange for Controller... = ="
BTW, because react-select cannot bind to onSubmit of Form, need to create state for it.
11/27 I tried state and context, both cannot reflect result at the same cycle, need twice. I don't like it.
Change to use global variable.  --> X
Use useEffect() can solve this issue. But still go back no re-render issue. Solved by dispatch.

11/30 Done New columns for Search, (searchkey) and took out language origianl controller.


https://cors-anywhere.herokuapp.com/
https://getbible.net/json?passage=Gen 1:1-5&version=cnt
https://cors-anywhere.herokuapp.com/https://getbible.net/json?passage=Gen 1:1-5&version=cnt  

https://trina0224.github.io/WalkingWithGod/
