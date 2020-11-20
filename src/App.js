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
    case 'UPDATE_INPUT':
      console.log("// DEBUG: In reducer().");
      return update(state, { "grabbedText": {$set: action.data}});
      // return {
      //     "grabbedText": action.data  //<======
      // };

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
