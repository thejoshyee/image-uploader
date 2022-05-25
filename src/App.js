import './App.css'
import React, { useState, useEffect } from 'react'
import DragAndDrop from './components/DragAndDrop'
import { ProgressBar } from "react-bootstrap"

const App = () => {





  // if progroess is null 
    // show drag and drop box
  
  // if progress is filled 
    //show progress bar instead of drag and drop

  // after progress bar is done set uploaded to true

  // if uploaded is true, show the Drag and Drop Results


  return (
    <div className="box">
      <p className="box__title">UPLOAD YOUR IMAGE</p>
      <p className="box__title2">File should be jpeg, png...</p>

      <DragAndDrop />




    </div>
  );
};

export default App