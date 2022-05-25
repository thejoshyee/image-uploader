import React, { useState, useRef } from 'react';
import '../App.css'
import uploadImageIcon from '../upload-image.svg'
import axiosInstance from '../utils/axiosInstance';
import { ProgressBar } from "react-bootstrap"


const DragAndDrop = props => {

  const fileInput = useRef(null);
  const [previewUrl, setPreviewUrl] = useState('')

  const [progress, setProgress] = useState()


  const handleFile = file => {
      //put validations here
      setPreviewUrl(URL.createObjectURL(file))
    //   let formData = new FormData()

    //   formData.append('file', selectedFiles[0])

      axiosInstance.post('/upload_file', file, {
          headers: {
              "Content-Type": "image/png",
          },
          onUploadProgress: data => {
              setProgress(Math.round((100 * data.loaded) / data.total))
          }
      })
  }

  const handleOndragOver = e => {
      e.preventDefault()
  }

  const handleOnDrop = e => {
    e.preventDefault()
    e.stopPropagation()

    let imageFile = e.dataTransfer.files[0]
    console.log("first", imageFile)
    handleFile(imageFile)
}

    
  return (
      <div className="box-Wrapper">
        
        {previewUrl ? <img alt="upload_image" className="dropped-image" src={previewUrl}/> : 
            <div> 
                <div className='drag-drop-zone' onDrop={handleOnDrop} onDragOver={handleOndragOver} onClick = { () => fileInput.current.click()} >
                    <img alt="upload_image" src={uploadImageIcon} />

                    <p className="dragBox__title">Click to Select</p>
                    <p className="dragBox__title">or</p>
                    <p className="dragBox__title">Drag and Drop image here...</p>

                    <input 
                        type="file" 
                        accept='image/*' 
                        ref={fileInput} hidden 
                        onChange={e => handleFile(e.target.files[0])}
                        name="file"

                    />

                </div>

            </div>

            }

        {progress && <ProgressBar now={progress} label={`${progress}%`} />}



    </div>
  );
};
export default DragAndDrop;