import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import Cropper from 'react-easy-crop'
import './Square.css'

const Square = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
  }, [])
  return (
    <div className="App">
      <div className="crop-container">
        <Cropper
          image= {props.img}
          crop={crop}
          zoom={zoom}
          aspect={4 / 4}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

    </div>
  )
}

export default Square;
