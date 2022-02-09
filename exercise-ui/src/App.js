import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';

/**
 * Creates the routers for the pages in the app
 * @returns
 */
function App() {

  // creates a state and state function
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>
        <div className="App-header">
          <Route path="/" exact>
            {// HomePage gets ability to set exercise to edit
            }
            <HomePage setExerciseToEdit={setExerciseToEdit} />
          </Route>
          <Route path="/create-exercise">
            <CreateExercisePage />
          </Route>
          <Route path="/edit-exercise">
            {// EditExercisePage gets the 
            }
            <EditExercisePage exerciseToEdit={exerciseToEdit} />
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;