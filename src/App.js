import React, { useReducer } from 'react';
import './App.css';
import MyForm from './MyForm';
import VerseDisplay from './VerseDisplay';
//Import immutability-helper
import update from 'immutability-helper';




// Create context object
export const AppContext = React.createContext();

// Set up Initial State
const initialState = {
  "grabbedText":""
};


function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_INPUT'://save the string we really want to display on screen.
      console.log("// DEBUG: In reducer() Update Input.");
      return update(state, { "grabbedText": {$set: action.data}});
    break;
      // return {
      //     "grabbedText": action.data  //<======
      // };
    case 'UPDATE_SEARCH':
      console.log("// DEBUG: In reducer() Update Search.");
      return update(state, { "searchQuery": {$set: action.data}});
    break;

    case 'UPDATE_BACKGROUNDKEYWORD':
      console.log("// DEBUG: In reducer() Update background keyword.");
      return update(state, { "searchBackgroundQuery": {$set: action.data}});
    break;

    case 'UPDATE_BIBLEBOOKLANGUAGE':
      console.log("// DEBUG: In reducer() Update bible language.");
      return update(state, { "changeBookLanguage": {$set: action.data}});
    break;

    case 'UPDATE_BOOKSELECT':
      console.log("// DEBUG: In reducer() Update bible book.");
      return update(state, { "selectedBook": {$set: action.data}});
    break;

    case 'UPDATE_BOOKCHAPTER':
      console.log("// DEBUG: In reducer() Update book max chapter.");
      return update(state, { "changedMaxChapter": {$set: action.data}});
    break;

    case 'UPDATE_MAXVERSE':
      console.log("// DEBUG: In reducer() Update chapter max verse.");
      return update(state, { "changedMaxVerse": {$set: action.data}});
    break;

    case 'UPDATE_SEARCH_CLICKED':
      console.log(state.isSearchKeyClicked);
      console.log("// DEBUG: In reducer() search key is clicked. or status updated.");
      return update(state, { "isSearchKeyClicked": {$set: action.data}});
    break;

      // case 'UPDATE_OLD_SEARCH_KEYWORD_FOR_BACKGROUND':
      //   console.log("// DEBUG: In reducer() search key is clicked.");
      //   return update(state, { "oldSearchQueryKeyword": {$set: action.data}});

    default:
      return initialState;
  }
}


function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
    <AppContext.Provider value={{ state, dispatch }}>
    <MyForm />
    <VerseDisplay />
    </AppContext.Provider>

    </div>
  );
}

export default App;
