import styled from 'styled-components';

export const ContactWrapper = styled.section`
  ${props => props.theme.spacing.sectionBottom};
  height: 100%;
`

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
`
export const LeftContent = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 6%;
  width: fit-content;
  text-align: center;

  &, p, h3 {
    color: #f8f8f8;
  }

  @media ${props => props.theme.media.fablet} {
    display: none;
  }
`

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

  input:first-child {
    margin-right: 10px;
  }
  input, textarea {
    padding: 10px 15px;
    border-radius: 5px;
    background-color: #EAEAEA;
    border: none;
    margin: 10px 0;
    width: auto;
    flex: 1;
  }

  textarea {
    margin: 10px 0;
    width: 100%;
    height: 200px;
    resize: none;
  }

  @media ${props => props.theme.media.fablet} {
    input, textarea  {
      padding: 20px 15px;
    }
    input:first-child {
      margin-right: 0;
    }
    padding: 30px 25px;
    padding-bottom: 60px;
    position: unset;
    width: 100%;
    top: 0px;
    right: 0px;
  }
`
