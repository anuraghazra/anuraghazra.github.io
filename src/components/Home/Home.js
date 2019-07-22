import React from "react";
import styled from 'styled-components';

import svgRect from 'src/static/home_rect.svg'

import { HeroCard } from './HeroCard';
import { HomeWrapper, Intro } from './Home.style';

import IconLink from 'src/components/common/IconLink';
import PageHeader from 'src/components/common/PageHeader';
import Flex from "src/components/common/Flex";
import Button from "src/components/common/Button";


const Card = styled.div`
  flex: 0 1 24%;
  height: 300px;
  padding: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center; 
  flex-direction: column;
  text-align: center;
  background-color: ${props => props.theme.primaryWhite};
  box-shadow: ${props => props.theme.shadowSmall}; 
  border-radius: 10px;

  @media ${props => props.theme.media.tablet} {
    flex: 0 1 100%;
    margin: 20px 0;
  }
`

const CardIcon = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${props => props.theme.gradient};
  color: ${props => props.theme.primaryWhite};

  i {
    height: 100px;
    line-height: 100px;
    font-size: 2.2rem;
  }
`

const CardTitle = styled.h3`
  font-weight: normal;
  color: ${props => props.theme.primaryColor};
`

const CardText = styled.p`
  font-size: 14px;
  color: ${props => props.theme.primaryBlack};
`

const ThingsILove = () => (
  <Flex as="section" justify="space-between" align-items="center">
    <Card>
      <CardIcon><i className="fas fa-code" /></CardIcon>
      <CardTitle>FrontEnd</CardTitle>
      <CardText>
        i'm more front end focused and love to work with React as well as pure HTML, CSS
      </CardText>
    </Card>

    <Card>
      <CardIcon><i className="fab fa-js" /></CardIcon>
      <CardTitle>Javascirpt</CardTitle>
      <CardText>
        I just extreamly love javascirpt, i can’t even express how much i love javascirpt with just a few lines.
      </CardText>
    </Card>

    <Card>
      <CardIcon><i className="fas fa-paint-brush" /></CardIcon>
      <CardTitle>Creative Coding</CardTitle>
      <CardText>
        I love creative coding because i do both coding & designing. making beautifull art with code is very satisfying to me
      </CardText>
    </Card>
  </Flex>
);

const Home = () => {
  return (
    <HomeWrapper id="home">
      <img className="svg-rect" src={svgRect} alt="" />

      <Intro>
        <div className="home__text">
          <p>Hello, i’m</p>
          <h1>ANURAG HAZRA</h1>
          <p className="adjust">CREATIVE FRONT-END WEB DEVELOPER</p>

          <div class="home__CTA">
            <Button>Download Resume</Button>

            <div class="home__social">
              <IconLink icon="fab fa-github" href="#" />
              <IconLink icon="fab fa-dribbble" href="#" />
              <IconLink icon="fab fa-twitter" href="#" />
            </div>
          </div>
        </div>
        <HeroCard />
      </Intro>

      {/* Things I LOVE */}
      <PageHeader>Things i love <i class="fas fa-heart" /></PageHeader>
      <ThingsILove />

    </HomeWrapper>
  )
}

export default Home;