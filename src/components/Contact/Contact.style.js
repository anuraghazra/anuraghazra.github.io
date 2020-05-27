import styled from 'styled-components';

export const ContactWrapper = styled.section`
  margin-bottom: 200px;
  height: 100%;
`;

export const ContactBox = styled.div`
  width: calc(100% - 30px);
  position: relative;
  height: 400px;
  margin-bottom: 50px;
  margin-top: 150px;

  background: ${props => props.theme.gradient};

  padding: 20px;
  border-radius: 10px;

  @media ${props => props.theme.media.fablet} {
    width: 100%;
    padding: 10px;
    margin-top: 50px;
  }
`;
export const LeftContent = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 6%;
  width: fit-content;
  text-align: center;

  &,
  p,
  h3 {
    color: #f8f8f8;
  }

  @media ${props => props.theme.media.fablet} {
    display: none;
  }
`;

export const ContactForm = styled.form`
  position: absolute;
  width: 70%;

  top: -50px;
  right: -40px;
  padding: 50px 30px;
  background: ${props => props.theme.secondaryColor};
  border-radius: 10px;
  min-height: 400px;

  box-shadow: ${props => props.theme.shadowSmall};

  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'email name'
    'textarea textarea'
    '. button';

  label span {
    font-size: 0.85em;
    color: ${p => (p.theme.dark ? '#fff' : '#252525')};
  }
  .label__email {
    grid-area: email;
  }
  .label__name {
    grid-area: name;
  }
  .label__message {
    grid-area: textarea;
  }
  .submit__btn {
    justify-self: end;
    width: fit-content;
    grid-area: button;
  }

  @media ${props => props.theme.media.tablet} {
    grid-template-areas:
      'email email'
      'name name'
      'textarea textarea'
      '. button';
  }

  input,
  textarea {
    padding: 10px 15px;
    border-radius: 5px;
    background-color: #eaeaea;
    border: none;
    margin: 10px 0;
    width: 100%;
  }

  textarea {
    margin: 10px 0;
    width: 100%;
    height: 200px;
    resize: none;
  }

  @media ${props => props.theme.media.fablet} {
    input,
    textarea {
      padding: 20px 15px;
    }

    padding: 30px 25px;
    padding-bottom: 20px;
    position: unset;
    width: 100%;
    top: 0px;
    right: 0px;
  }
`;
