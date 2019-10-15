import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
      <CardIcon><FontAwesomeIcon icon="code" /></CardIcon>
      <CardTitle>FrontEnd</CardTitle>
      <CardText>
        i'm more front end focused and love to work with React as well as pure HTML, CSS
      </CardText>
    </Card>

    <Card>
      <CardIcon><FontAwesomeIcon icon={["fab", "js"]} /></CardIcon>
      <CardTitle>Javascirpt</CardTitle>
      <CardText>
        I just extreamly love javascirpt, i can’t even express how much i love javascirpt with just a few lines.
      </CardText>
    </Card>

    <Card>
      <CardIcon><FontAwesomeIcon icon="paint-brush" /></CardIcon>
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
      <img className="svg-rect" src={svgRect} alt=""></img>

      <Intro>
        {/* <Parallax y={[50, -50]} className="home__text"> */}
        <div className="home__text">
          <p>Hello, i’m</p>
          <h1>ANURAG HAZRA</h1>
          <p className="adjust">CREATIVE FRONT-END WEB DEVELOPER</p>

          <div className="home__CTA">
            <Button className="cta" as="a" href="#">Download Resume</Button>

            <div className="home__social">
              <IconLink label="github" icon={["fab", "github"]} href="//github.com/anuraghazra" />
              <IconLink label="twitter" icon={["fab", "twitter"]} href="//twitter.com/anuraghazru" />
              <IconLink label="codepen" icon={["fab", "codepen"]} href="//codepen.io/anuraghazra" />
            </div>
          </div>
        </div>
        {/* </Parallax> */}
        <HeroCard />
      </Intro>

      {/* Things I LOVE */}
      <PageHeader style={{ marginBottom: 30 }}>Things i love <i className="fas fa-heart" /></PageHeader>
      <ThingsILove />

    </HomeWrapper>
  )
}

export default Home;