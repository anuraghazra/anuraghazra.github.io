import React from 'react';

import SkewBg from '@common/SkewBg';
import PageHeader from '@common/PageHeader';
import Flex from '@common/Flex';

import Quote from './Quote';
import Avatar from './Avatar';

import { AboutWrapper, AboutInfo } from './About.style';

const About = () => {
  return (
    <AboutWrapper id="about">
      <PageHeader>About Me</PageHeader>
      <SkewBg />
      <AboutInfo>
        <div>
          <Avatar src="logo.png" />
        </div>
        <p>
          Hey! Ich bin CronixZero. Ich bin ein Java Developer und setze mich aktuell mit JavaScript auseinander. Aktuell bin ich Moderator auf dem{' '}
          <a className="about__link" href="https://mypvp.me">
            MyPvP.me Netzwerk
          </a>{' '}
          Ich setze mich hauptsächlich mit der Minecraft Plugin Entwicklung auseinander. 
          <br />
          <br />
          In meiner meiner Freizeit beschäftige ich mich außerdem mit Bild- & Videobearbeitung.
        </p>
      </AboutInfo>

//      <Flex justify="space-between" className="quotes__wrapper">
//        <Quote>
//          <p>“Simplicity is the baddest choice to be the best.“</p>
//        </Quote>
//        <Quote>
//          <p>
//            “I know I’m not successful enough, but I’m passionate enough not to
//            worry about success.“
//          </p>
//        </Quote>
//        <Quote>
//          <p>
//            “Creativity is the driver of an unstoppable train called Passion.”
//          </p>
//        </Quote>
//      </Flex>
    </AboutWrapper>
  );
};

export default About;
