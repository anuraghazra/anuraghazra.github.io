import React from "react";

import svgRect from 'src/static/home_rect.svg'

import { HeroCard } from './HeroCard';
import { HomeWrapper, Intro } from './Home.style';

import IconLink from 'src/components/common/IconLink';
import PageHeader from 'src/components/common/PageHeader';
import Flex from "src/components/common/Flex";
import Button from "src/components/common/Button";

import { Card, CardIcon, CardText, CardTitle } from "src/components/common/Card";

const ThingsILove = () => (
  <Flex justify="space-between" align="center">
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