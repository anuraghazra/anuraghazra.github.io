import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import svgRect from '@src/static/home_rect.svg';

import { HeroCard } from './HeroCard';
import { HomeWrapper, Intro } from './Home.style';

import IconLink from '@common/IconLink';
import PageHeader from '@common/PageHeader';
import Flex from '@common/Flex';
import Button from '@common/Button';

import { Card, CardIcon, CardText, CardTitle } from '@common/Card';

const ThingsILove = () => (
  <Flex justify="space-between" align="center">
    <Card>
      <CardIcon>
        <FontAwesomeIcon icon="puzzle-piece" />
      </CardIcon>
      <CardTitle>Minecraft Plugins</CardTitle>
      <CardText>
        Ich arbeite nun schon länger mit der Spigot / Bukkit API zusammen und erstelle auch regelmäßig Minecraft Plugins mit dieser.
      </CardText>
    </Card>

    <Card>
      <CardIcon>
        <FontAwesomeIcon icon={['fab', 'java']} />
      </CardIcon>
      <CardTitle>Java</CardTitle>
      <CardText>
        Ich programmiere schon ~3-4 Jahre mit Java und habe damit Projekte von Discord Bots zu Anwendungen bis Minecraft Plugins entwickelt.
      </CardText>
    </Card>

    <Card>
      <CardIcon>
        <FontAwesomeIcon icon="paint-brush" />
      </CardIcon>
      <CardTitle>Bild- & Videobearbeitung</CardTitle>
      <CardText>
          Ich erstelle oft kleine Logos, Banner und andere Sachen, die mir in den Kopf kommen.
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
          <p>Hey, ich bin</p>
          <h1>CronixZero</h1>
          <p className="adjust">Java Developer</p>

          <div className="home__CTA">
            <div className="home__social">
              <IconLink
                label="github"
                icon={['fab', 'github']}
                href="//github.com/CronixZero"
              />
              <IconLink
                label="twitter"
                icon={['fab', 'twitter']}
                href="//twitter.com/CronixZero"
              />
              <IconLink
                label="YouTube"
                icon={['fab', 'youtube']}
                href="//www.youtube.com/channel/UCZlhuzs8dAIT559anWA7Ekg"
              />
            </div>
          </div>
        </div>
        {/* </Parallax> */}
        <HeroCard />
      </Intro>

      {/* Things I LOVE */}
      <PageHeader style={{ marginBottom: 30 }}>
        Things I love <i className="fas fa-heart" />
      </PageHeader>
      <ThingsILove />
    </HomeWrapper>
  );
};

export default Home;
