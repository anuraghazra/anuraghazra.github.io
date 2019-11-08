import styled from 'styled-components';

import Flex from 'src/components/common/Flex'
import { Card } from 'src/components/common/Card';


export const CreativeCodingWrapper = styled.section`
  ${props => props.theme.spacing.sectionBottom};
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-content: center;
  align-items: center;
  grid-gap: 20px;
  grid-row-gap: 50px;
`

export const CCard = styled(Card)`
  justify-self: center;

  margin: 0;
  position: relative;
  padding: 0;
  border-radius: 10px;
  overflow: hidden;
  min-width: unset;
  width: 100%;


  height: auto;
  max-width: 90%;

  transform: translateY(0px);
  transition: transform 0.2s ease;
  &:hover {
    transition: transform 0.2s ease;
    transform: translateY(-5px);
  }

  h4 {
    font-weight: normal;
  }

  .gatsby-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height:100%;
    border-radius: 10px;
  }

  .thumbnail-a {
    width: 100%;
    height: 100%;
  }
`
export const CardFooter = styled(Flex)`
  width: 100%;
  padding: 20px;

  a {
    margin-left: 5px;
  }
`