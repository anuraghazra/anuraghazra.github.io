import styled from "styled-components";

export const ProjectWrapper = styled.section`
  margin: 80px 0;
`

export const ProjectContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 170px 1fr;
  grid-template-rows: 1fr;
  align-items: center;
`;

export const ProjectDetail = styled.div`
  padding: 50px 50px;
  background-color: ${props => props.theme.primaryWhite};
  box-shadow: ${props => props.theme.shadowSmall};
  border-radius: 10px;

  min-height: 350px;

  grid-column: 1 / 3;
  grid-row: 1 / 1;
  
  h2 {
    color: ${props => props.theme.primaryBlack};
    margin-bottom: 25px;
  }

  .project__detail-container {
    width: 75%;

    p {
      min-height: 250px;
    }
  }

  @media ${props => props.theme.media.fablet} {
    min-height: unset;
    grid-column: 1 / 4;
    grid-row: unset;
    padding: 30px 30px;
    .project__detail-container {
      width: 100%;

      p {
        min-height: unset;
      }
    }
  }
`;

export const ProjectLinks = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  margin-bottom: 0;

  a {
    margin-right: 10px;
  }
`

export const ProjectPreview = styled.div`
  grid-column: 2 / 4;
  grid-row: 1 / 1;
  position: relative;
  right: -20px;

  @media ${props => props.theme.media.fablet} {
    right: 0;
    grid-column: 1 / 4;
    margin-bottom: 20px;
  }

  iframe {
    border-radius: 10px;
  }
`
export const Tags = styled.div`
  @media ${props => props.theme.media.fablet} {
    display: none;
  }
  
  margin: 10px;
  color: ${props => props.theme.secondaryColor};
  display: flex;
  font-size: 24px;

  i {
    margin-right: 25px;
  }
`