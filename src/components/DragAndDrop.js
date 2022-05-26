import React, { useState, useRef, useEffect } from 'react';
import '../App.css'
import uploadImageIcon from '../upload-image.svg'
import axiosInstance from '../utils/axiosInstance';
import { ProgressBar } from "react-bootstrap"
import checkmark from '../assets/checkmark.png'


const DragAndDrop = (props) => {

  const fileInput = useRef(null);
  const [previewUrl, setPreviewUrl] = useState('')
  const [progress, setProgress] = useState(null)
  const [message, setMessage] = useState(null)
  const [uploaded, setUploaded] = useState(false)  
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(previewUrl) {
        setTimeout(() => {
            setIsLoading(false)
            setUploaded(true)
        }, 2000)
    }
  },[previewUrl])

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
              setIsLoading(true)
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
                setIsLoading(true)

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
           

        {uploaded ?    
                <div className="uploaded-wrapper">
                    <div className="uploaded-success-message-wrapper">
                        <img src={checkmark} alt="check" className="checkmark" />
                        <p className="uploaded-success">Uploaded Successfully!</p>
                    </div>
                    <div className="dropped-image">
                        <img alt="upload_image" className="dropped-image" src={previewUrl} />
                        <div className="clipboard-wrapper">
                            <input className="copy-btn__input"readOnly value={previewUrl} onClick={copyToClipboard} ref={(ref) => myInput = ref} />
                            <button className="copy-btn" onClick={copyToClipboard}>Copy Link</button>
                        </div>

                        <p className="copybox__message">{message}</p>
                    </div>
                </div>
            :
            (<>
                {isLoading ? 
                    (<>
                        <h4>Uploading...</h4>
                        <ProgressBar className="progress-bar" now={progress} label={`${progress}%`} />
                    </>)
                : 
                    (<div className="drop-zone-wrapper">
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


                        <p className="or">Or</p>
                        <button className="choose-btn" type="button">Choose a file</button>

                    </div>)
                }
            </>)
        }

    </div>
  );
};
export default DragAndDrop;