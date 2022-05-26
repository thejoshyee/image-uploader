import './App.css'
import React from 'react'
import DragAndDrop from './components/DragAndDrop'

const App = () => {

  return (
    <div className="box">
      <p className="box__title">THE IMAGE MACHINE</p>
      <p className="box__subtitle">what image do you need to be hosted?</p>
      <p className="box__title2">File should be jpeg, png...</p>
      <DragAndDrop />
    </div>
  );
};

export default App