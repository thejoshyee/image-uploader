import React, { useState, useRef, useEffect } from 'react'
import '../App.css'
import uploadImageIcon from '../upload-image.svg'
import axiosInstance from '../utils/axiosInstance'
import { ProgressBar, Alert } from "react-bootstrap"
import checkmark from '../assets/checkmark.png'


const DragAndDrop = (props) => {

  const fileInput = useRef(null);
  const [previewUrl, setPreviewUrl] = useState('')
  const [progress, setProgress] = useState(null)
  const [message, setMessage] = useState(null)
  const [uploaded, setUploaded] = useState(false)  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [awsUrl, setAwsUrl] = useState(null)
  const [fileName, setFileName] = useState('')
  

  useEffect(() => {
    if(previewUrl) {
        setTimeout(() => {
            setIsLoading(false)
            setUploaded(true)
            getAwsUrl(fileName)

        }, 4000)
    }
  },[previewUrl])



  const validateSize = (file) => {
    let maxfilesize = 1024 * 1024
    let filesize = file.size
    
    if ( filesize > maxfilesize ) {  
      return false
    } else {
        return true
    }
  }

  const getAwsUrl = (fileName) => {
      const generateGetUrl = '/generate-get-url'
      const options = {
          params: {
            Key: fileName,
            ContentType: 'image/jpeg'
          }
      }

      axiosInstance.get(generateGetUrl, options).then(res => {
          const { data: getURL } = res
          setAwsUrl(getURL)
      })

  }


  const handleFile = file => {
      //put validations here
      let validation = validateSize(file)
      if (!validation) {
          setError('Please choose a file that is 1 mb or less.')
          setTimeout(() => {
              setError('')
          },4000)
          return false
      } else {

        setPreviewUrl(URL.createObjectURL(file))

        setFileName(file.name)
      
        let formData = new FormData()
  
        formData.append('file', file)

        setIsLoading(true)

        axiosInstance.post('/categories', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: data => {
                setProgress(Math.round((100 * data.loaded) / data.total))

            },
        })
        .catch(error => {
          const { code } = error.response.data
          switch (code) {
              case "FILE_MISSING":
                  setError("Please select a file before uploading")
                  break
              case "LIMIT_FILE_SIZE":
                  setError("File size is too large. Please upload files below 1MB!")
                  break
              case "INVALID_TYPE":
                  setError(
                      "This file type is not supported! Only .png, .jpg, and .jpeg files are allowed!"
                  )
                  break

              default:
                //   setError("Sorry, something went wrong. Please try again later.")
                  break
          }
      })
    }
  }


  const handleOnDrop = e => {
        e.preventDefault()
        e.stopPropagation()

        let droppedFile = e.dataTransfer.files[0]
        let sizeValidation = validateSize(droppedFile)
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.tiff|\.tif)$/i;
        
        if (!sizeValidation && !allowedExtensions.exec(e.dataTransfer.files[0].name)) {
            setError('Please choose a file that is 1 mb or less. And must be of JPG or PNG filetypes.')
            setTimeout(() => {
                setError('')
            },4000)
            return false
        } else if (!sizeValidation) {
            setError('Please choose a file that is 1 mb or less.')
            setTimeout(() => {
                setError('')
            },4000)
            return false
        } else if (!allowedExtensions.exec(e.dataTransfer.files[0].name)) {
            setError("File type not supported. Please choose an image file such as jpeg, jpg, or png.")
            setTimeout(() => {
                setError('')
            },4000)
            return false
        } else {
            
            let imageFile = e.dataTransfer.files

            setFileName(e.dataTransfer.files[0].name)
        
            setPreviewUrl(URL.createObjectURL(e.dataTransfer.files[0]))
    
            let formData = new FormData()
    
            formData.append("file", imageFile[0])
            setError('')

            setIsLoading(true)

            axiosInstance.post("/categories", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: data => {
                    //Set the progress value to show the progress bar
                    setProgress(Math.round((100 * data.loaded) / data.total))
    
                },        
            })
            .catch(error => {
                const { code } = error.response.data
                switch (code) {
                    case "FILE_MISSING":
                        setError("Please select a file before uploading")
                        break
                    case "LIMIT_FILE_SIZE":
                        setError("File size is too large. Please upload files below 1MB. Or Invalid File Type. Must use JPG or PNG.")
                        break
                    case "INVALID_TYPE":
                        setError(
                            "This file type is not supported! Only .png, .jpg, and .jpeg files are allowed!"
                        )
                        break
                        
                    default:
                        // setError("Sorry, something went wrong. Please try again later.")
                        break
                }
            })

        }
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

    const displayOn = {
        display: "block"
    }
    
    const displayOff = {
        display: "none"
    }
  return (
      <div className="box-Wrapper">
        {isLoading ? (
            <div style={isLoading ? displayOn : displayOff}>
                <h4>Uploading...</h4>
                <ProgressBar className="progress-bar" now={progress} label={`${progress}%`} animated />
            </div>
        ) : uploaded ? (
                <div className="uploaded-wrapper">
                    <div className="uploaded-success-message-wrapper">
                        <img src={checkmark} alt="check" className="checkmark" />
                        <p className="uploaded-success">Uploaded Successfully!</p>
                    </div>
                    <div className="dropped-image">
                        <img alt="upload_image" className="dropped-image" src={previewUrl} />
                        <div className="clipboard-wrapper">
                            <input className="copy-btn__input"readOnly value={awsUrl} onClick={copyToClipboard} ref={(ref) => myInput = ref} />
                            <button className="copy-btn" onClick={copyToClipboard}>Copy Link</button>
                        </div>

                        <p className="copybox__message">{message}</p>
                    </div>
                </div>
        ) : (
                    <div className="drop-zone-wrapper">
                        <div className='drag-drop-zone' onDrop={handleOnDrop} onDragOver={handleOndragOver}>

                            <img className="dragbox__icon" alt="upload_image" src={uploadImageIcon} />

                            <p className="dragBox__title">Drag and Drop Image</p>

                                <input 
                                    type="file" 
                                    accept='image/*' 
                                    ref={fileInput} hidden
                                    onChange={e => handleFile(e.target.files[0])}
                                />

                        </div>
                        <p className="or">Or</p>
                        <button className="choose-btn" onClick = { () => fileInput.current.click()} type="button">Choose a file</button>
                    </div>
                
        )}

        {error && <Alert className="alert" variant="danger">{error}</Alert>}
        <p className="footer">The Image Machine 2022</p>
    </div>
  );
};
export default DragAndDrop;