import './App.css'
import React, { useState } from 'react'
import DragAndDrop from './components/DragAndDrop'

const App = () => {




  return (
    <div className="box">
      <p className="box__title">UPLOAD YOUR IMAGE</p>
      <p className="box__title2">File should be jpeg, png...</p>
      <DragAndDrop />




    </div>
  );
};

export default App