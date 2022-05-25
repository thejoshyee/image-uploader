import React, { useState, useRef } from 'react';
import '../App.css'
import uploadImageIcon from '../upload-image.svg'
import axiosInstance from '../utils/axiosInstance';
import { ProgressBar } from "react-bootstrap"


const DragAndDrop = (props) => {

  const fileInput = useRef(null);
  const [previewUrl, setPreviewUrl] = useState('')
  const [progress, setProgress] = useState(null)
  const [message, setMessage] = useState(null)
  const [uploadMessage, setUploadMessage] = useState(null)

  const handleFile = file => {
      //put validations here
      setPreviewUrl(URL.createObjectURL(file))
      
      let formData = new FormData()

      formData.append('file', file)

      axiosInstance.post('/upload_file', formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
          onUploadProgress: data => {
              setProgress(Math.round((100 * data.loaded) / data.total))
          }
      })
  }


  const handleOnDrop = e => {
        e.preventDefault()
        e.stopPropagation()

        let imageFile = e.dataTransfer.files
        setPreviewUrl(URL.createObjectURL(e.dataTransfer.files[0]))

        let formData = new FormData()

        formData.append("file", imageFile[0])
        axiosInstance.post("/upload_file", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: data => {
                //Set the progress value to show the progress bar
                setProgress(Math.round((100 * data.loaded) / data.total))
                if (data.loaded === data.total) {
                    console.log("its done")
                }
            },        
        })
    }

    const handleOndragOver = e => {
        e.preventDefault()
    }

    let myInput = null;
    const copyToClipboard = () => {
      myInput.select();
      document.execCommand("copy");
      setMessage("Copied link to clipboard!")
      setTimeout(() => {
          setMessage(null)
      }, 3000)
    };


    
  return (
      <div className="box-Wrapper">
           

        {!previewUrl ?    
            <div> 
                <div className='drag-drop-zone' onDrop={handleOnDrop} onDragOver={handleOndragOver} onClick = { () => fileInput.current.click()} >
                    <img className="dragbox__icon" alt="upload_image" src={uploadImageIcon} />
                    <p className="dragBox__title">Click to Select or</p><p className="dragBox__title2">Drag and Drop Image</p>
                    
                        <input 
                            type="file" 
                            accept='image/*' 
                            ref={fileInput} hidden
                            onChange={e => handleFile(e.target.files[0])}

                        />
                </div>
            </div>
            : 
            <>
                <img alt="upload_image" className="dropped-image" src={previewUrl} />
                <ProgressBar className="progress-bar" now={progress} label={`${progress}%`} />
                <input className="copy-btn__input"readOnly value={previewUrl} onClick={copyToClipboard} ref={(ref) => myInput = ref} />
                <button className="copy-btn" onClick={copyToClipboard}>Copy Link</button>
                <p className="copybox__message">{message}</p>
            </>
        }





    </div>
  );
};
export default DragAndDrop;