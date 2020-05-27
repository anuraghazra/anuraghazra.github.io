import React, { useContext } from 'react';
import styled from 'styled-components';
import ThemeToggleContext from '@components/Layout/ThemeToggleContext';

const SwitchWrapper = styled.div`
  input[type='checkbox'] {
    height: 100%;
    width: 100%;
    visibility: visible;
  }

  .button-cover,
  .knobs,
  .layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .button {
    position: relative;
    top: 50%;
    width: 74px;
    height: 30px;
    overflow: hidden;
  }

  .button.r,
  .button.r .layer {
    border-radius: 100px;
  }

  .button.b2 {
    border-radius: 2px;
  }

  .checkbox {
    position: relative;
    width: 100% !important;
    height: 100% !important;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
  }

  .knobs {
    z-index: 2;
  }

  .layer {
    width: 100%;
    /* background-color: #ebf7fc; */
    transition-delay: 1s;
    transition: 0.2s ease all;
    z-index: 1;
    background-color: ${p => p.theme.accentColor};
  }

  /* Button 1 */
  #button-1 .knobs:before {
    content: 'DARK';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 30px;
    height: 5px;
    color: #fff;
    font-size: 8px;
    font-weight: bold;
    text-align: center;
    line-height: 0.5;
    padding: 9px 4px;
    background-color: ${p => p.theme.primaryColor};
    border-radius: 30px;
    transition-delay: 1s;
    transition: 0.2s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
  }

  #button-1 .checkbox:checked + .knobs:before {
    content: 'LIGHT';
    left: 32px;
    background-color: ${p => p.theme.primaryColor};
  }

  /* #button-1 .checkbox:checked ~ .layer {
    
  } */

  #button-1 .knobs,
  #button-1 .knobs:before,
  #button-1 .layer {
    transition-delay: 1s;
    transition: 0.2s ease all;
  }
`;

const ToggleSwitch = () => {
  const { toggleTheme, theme } = useContext(ThemeToggleContext);

  return (
    <SwitchWrapper>
      <div className="button r" id="button-1">
        <input
          className="checkbox"
          aria-label="toggle theme"
          type="checkbox"
          onChange={toggleTheme}
          checked={theme === 'dark' ? true : false}
        />
        <div className="knobs"></div>
        <div className="layer"></div>
      </div>
    </SwitchWrapper>
  );
};

export default ToggleSwitch;
