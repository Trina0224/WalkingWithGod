# Credit  
1. https://cors-anywhere.herokuapp.com/ Rob--W's   
2. http://ibibles.net/  
3. https://getbible.net/  

# Issues  
1. Need to double click search.  <==
https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
The easy answer: useEffect instead useState.(solved)  
2. In REACT, if you see something undefined in object but you are sure it's right. The problem is from
react will run page two times and one is without data, so, we need to check the object is really exist.
In VerseDisplay.js, I put if(state.searchQuery) to prevent issue happen.(solved)  
3. On Github Pages, it must query via https. http is not working.(solved)  
4. Arrary comapre is a little complex than I thought. Refer:  
https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript  
This is used in FetchBackground.js  
5. Cannot find 'react-native', solved by 'npm install react-native-web'  https://www.xspdf.com/resolution/52674239.html  
6.




# Todos:  
8. Clean non-necessary console.log().
9. no verse returned processing. ok.  ?? it not working some times.. need to dig in. Dig out some issues are from API remote server, I cannot handle it. Need some workaround later.  
11. Default generate random famous verses.  
19. code clean.  
21. Check background size.  
27. Verses at bottom side of screen, the layout is not good at small screen. (12/14)  
30. seems too many Effect-re-rendering.




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
20. Try submit to website, and check CORS issues. ok. Even on github pages, we still need CORS walk-around.(12/7)  
17. Click on verses and can change display location on the screen. ok.(12/7)  
18. Can Also change shading location on the background.ok. (12/7)  
22. Add Deutsch and French. ok. (12/9)  
16. Bug, click hide/unhide and cause background change. ok. ??on checking (12/10) The issue is caused from fetchbacground process. If fetching set is the same, background will not fetch again for now. but need to check point 24 later.  
25. Remember to change back original API Key. (12/10) ok.  
23. Disable Search Key when processing.(12/11) ok.(no different at frontend, but backend.)  
24. FetchBackground.js need to modify. if verse cannot fit any querySet.  Right now focusing on 'bible'  query background issue. (12/10)  I try to solved this by add if(tempuse>=5)
  photosUrl = `${url}&query="Jesus"`;  
26. shuffle an array for background images.(https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)  (12/12)  --> seems I dont need to go this.  
28. After searched verse, hide form. (12/15)  ok.  
29. Detect Screen landscape or portrait. (12/15)  https://reactnative.dev/docs/dimensions  ok.











MEMO: work on this link:  
https://codesandbox.io/s/jrze53pqr?file=/index.js:1092-1102  
because there is no onChange for Controller... = ="  
BTW, because react-select cannot bind to onSubmit of Form, need to create state for it.  
11/27 I tried state and context, both cannot reflect result at the same cycle, need twice. I don't like it.  
Change to use global variable.  --> X  
Use useEffect() can solve this issue. But still go back no re-render issue. Solved by dispatch.  

11/30 Done New columns for Search, (searchkey) and took out language origianl controller.  
12/07 use Rob--W's code and create one repo on heroku.  



https://cors-anywhere.herokuapp.com/  
https://getbible.net/json?passage=Gen 1:1-5&version=cnt  
https://cors-anywhere.herokuapp.com/https://getbible.net/json?passage=Gen 1:1-5&version=cnt  

#License  
NA


https://trina0224.github.io/WalkingWithGod/  
