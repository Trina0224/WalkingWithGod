# Credit  
1. https://cors-anywhere.herokuapp.com/ Rob--W's   
2. http://ibibles.net/  
3. https://getbible.net/  
4. https://unsplash.com/

# Issues  
1. Need to double click search.  <==
https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
The easy answer: useEffect instead of useState.(solved)  
2. In REACT, if you see something undefined in the object, but you are sure it's right. The problem is from
react will run page two times, and one is without data, so we need to check the object is exist.
In VerseDisplay.js, I put if(state.searchQuery) to prevent issues happen.(solved)  
3. On Github Pages, it must query via https. http is not working.(solved)  
4. Arrary compare is a little complex than I thought. Refer:  
https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript  
This is used in FetchBackground.js  
5. Cannot find 'react-native', solved by 'npm install react-native-web'  https://www.xspdf.com/resolution/52674239.html  
6. Screen Resolution for CSS. https://stackoverflow.com/questions/46313640/iphone-x-8-8-plus-css-media-queries  
https://stackoverflow.com/questions/58087446/all-media-queries-for-iphone-12-pro-max-mini-and-older-iphones  
https://kapeli.com/cheat_sheets/CSS_Device_Media_Queries.docset/Contents/Resources/Documents/index  
7. working on myForm. around 68 lines... cannot default book and language... (Solved by useState)  
8. in MyForm.js, useEffect(), there is a straightforward problem, Ref: https://stackoverflow.com/questions/13964155/get-javascript-object-from-array-of-objects-by-value-of-property  







# Todos:  
8. Clean non-necessary console.log().
9. no verse returned processing. ok.  ?? it not working sometimes.. I need to dig in. Dig out some issues are from API remote server, I cannot handle it. I need some workaround later.  
19. code clean.  
27. Verses at the bottom side of the screen, the layout is not good at a small screen. (12/14)  
30. It seems too many reducer-re-rendering. (Check all `state.xxx` related code.)
31. Rotate from landscape to portrait is fine, but portrait to landscape. (seems fixed. 12/16)
32. disable keyboard on iPad or iPhone. ( `readOnly="true"` is not working with react-select...)    
33. auto detect language and display the user's language.
36. Only display number keys on iPad or iPhone. (it works sometimes... why?)
37. Display style is strange on the Android phone.  

# Nice to have:  
38. need Hebrew book names  


# Done:  
1. another API search.   ok.
2. Modify webpage name and Favicon ok.  
3. background change.  ok.
4. smart background change.  (can be better)
5. No matter which version BIBLE user selects. We still need to extract from BBE. ok.
6. Using BBE to create a dictionary for a background. ok.
7. CopyRight Page.  (ok, can be better)
10. book name in a different language. ok.
12. Default book, language value. ok.  
13. Constraint chapter number ok.  
14. Constraint verse number. ok.  
15. Fix no select but just search issue.  ok. fixed by add "if(typeof state.selectedBook === 'undefined')"
20. Try submit to the website, and check CORS issues. ok. Even on github pages, we still need CORS walk-around.(12/7)  
17. Click on verses and can change the display location on the screen. ok.(12/7)  
18. Can Also change shading location on the background.ok. (12/7)  
22. Add Deutsch and French. ok. (12/9)  
16. Bug, click hide/unhide and cause background change. ok. ??on checking (12/10) The issue is caused by fetchbacground process. If the fetching set is the same, background will not fetch again for now. but need to checkpoint 24 later.  
25. Remember to change back the original API Key. (12/10) ok.  
23. Disable Search Key when processing.(12/11) ok.(no different at frontend, but backend.)  
24. FetchBackground.js needs to modify. if verse cannot fit any querySet.  Right now, focusing on the 'bible'  query background issue. (12/10)  I try to solve this by add if(tempuse>=5)
  photosUrl = `${url}&query="Jesus"`;  
26. shuffle an array for background images.(https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)  (12/12)  --> seems I don't need to go this.  
28. After the searched verse, hide form. (12/15)  ok.  
29. Detect Screen landscape or portrait. (12/15)  https://reactnative.dev/docs/dimensions  ok.
32. Cellphone support.(After did some research, small: <450px, regular: <1824px, full: >=1824px) ok. (12/16)  
21. Check the background size. (12/16) should be okay. Check some more days.  
34. Form is not really ready for Cellphones. (ok 12/17)  
11. Default generates famous random verses. ok. 12/18  
39. need to fix &lt &gt issue. (https://stackoverflow.com/questions/12328773/understanding-lt-and-gt/12328790)(https://stackoverflow.com/questions/5068951/what-do-lt-and-gt-stand-for#:~:text=%3C%20stands%20for%20lesser%20than,greater%20than%20(%3E)%20symbol%20.) (12/21)  
35. Some languages are still waiting to translate. ok. (12/21)  
40. Put some transparent effect on search icon. (ok. App.css 12/21)



















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
