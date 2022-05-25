import React, { useState, useRef } from 'react';
import '../App.css'
import uploadImageIcon from '../upload-image.svg'


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

  const handleFile = file => {
      //put validations here
      setPreviewUrl(URL.createObjectURL(file))
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

    </div>
  );
};
export default DragAndDrop;