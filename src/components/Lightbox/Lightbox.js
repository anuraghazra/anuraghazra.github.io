import React, { useState, useRef, useEffect } from 'react';

import { useSpring } from 'react-spring';

import styled from 'styled-components';

import LightboxWrapper from './Lightbox.style';
import PinchZoomPan from "react-responsive-pinch-zoom-pan";
import { IconButton } from "src/components/common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function useLightbox(totalImg) {
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
    setCurrentIndex((current + 1) % totalImg);
  }
  const prev = () => {
    setCurrentIndex((current - 1 + totalImg) % totalImg);
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


      <IconButton name="next" title="next" as="button" className="next" onClick={next} >
        <FontAwesomeIcon icon="chevron-right" />
      </IconButton>
      <IconButton name="previous" title="previous" as="button" className="prev" onClick={prev} >
        <FontAwesomeIcon icon="chevron-left" />
      </IconButton>
    </LightboxWrapper>
  );
}
export { Lightbox, useLightbox };    