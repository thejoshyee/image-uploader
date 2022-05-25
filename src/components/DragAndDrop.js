import React, { useState, useRef } from 'react';
import '../App.css'
import uploadImageIcon from '../upload-image.svg'
import axiosInstance from '../utils/axiosInstance';
import { ProgressBar } from "react-bootstrap"


const Uploading = () => {
    return (
        <div>
            <p>Uploading...</p>
        </div>
    )
}

const DragAndDrop = props => {

  const fileInput = useRef(null);
  const [previewUrl, setPreviewUrl] = useState('')

  const [selectedFiles, setSelectedFiles] = useState()
  const [progress, setProgress] = useState()


  const handleFile = file => {
      //put validations here
      setPreviewUrl(URL.createObjectURL(file))
      let formData = new FormData()

      formData.append('file', selectedFiles[0])

      axiosInstance.post('/upload_file', formData, {
          headers: {
              "Content-Type": "multipart/form-data",
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
                    />

                </div>

            </div>

            }

        {progress && <ProgressBar now={progress} label={`${progress}%`} />}

    </div>
  );
};
export default DragAndDrop;