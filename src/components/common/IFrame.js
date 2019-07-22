import React, { useState } from 'react';
import './iframe.css'

const IFrame = ({ src }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaded = () => {
    setIsLoading(false);
  }

  return (
    <div class="iframe-container">
      <iframe
        style={{ display: isLoading ? 'none' : 'block' }}
        width="100%"
        src={src}
        onLoad={handleLoaded}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen />
      {isLoading && <p>Loading.....</p>}
    </div>
  )
}

export default IFrame;