import React, { useState, useRef, useEffect } from 'react';

import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { Spring } from 'react-spring/renderprops';
import LightboxWrapper from './Lightbox.style';
import PinchZoomPan from "react-responsive-pinch-zoom-pan";

function useLightbox(images) {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrentIndex] = useState(-1);

  const hide = (e) => {
    if (e.target.tagName !== 'IMG') {
      e.stopPropagation();
      setIsOpen(false)
    }
  }
  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }
  const next = () => {
    setCurrentIndex((current + 1) % images.length);
  }
  const prev = () => {
    setCurrentIndex((current - 1 + images.length) % images.length);
  }

  return { isOpen, hide, handleImageClick, next, prev, current }
}

const Pinch = styled(PinchZoomPan)``

function Lightbox({ isOpen, current, hide, next, prev }) {
  const closer = useRef();
  const fadeIn = useSpring({
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? 'all' : 'none',
  });

  const preventScrolling = (e) => e.preventDefault();
  useEffect(() => {
    closer.current.addEventListener('mousewheel', preventScrolling, { passive: false });
    closer.current.addEventListener('touchmove', preventScrolling, { passive: false });

    return () => {
      closer.current.removeEventListener('mousewheel', preventScrolling);
      closer.current.removeEventListener('touchmove', preventScrolling);
    }
  }, [])

  return (
    <LightboxWrapper style={fadeIn}>

      <div className="closer" ref={closer} onClick={hide}>
        <Pinch maxScale={5} minScale={0.1} zoomButtons={false} position='center'>
          <img src={current} alt='' />
        </Pinch>
      </div>

      <button className="next" onClick={next}><i className="fas fa-chevron-right" /></button>
      <button className="prev" onClick={prev}><i className="fas fa-chevron-left" /></button>
    </LightboxWrapper>
  );
}
export { Lightbox, useLightbox };