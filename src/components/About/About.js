import React from "react";

import { withTheme } from 'styled-components';

import SkewBg from 'src/components/common/SkewBg';
import PageHeader from 'src/components/common/PageHeader';
import Flex from "src/components/common/Flex";

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
          <Avatar src="avatar.png" />
        </div>
        <p>
          Hi, i'm Anurag Hazra passionate self-taught frontEnd web developer from india. i tend to make use of modern web technologies to make websites which looks great, feels awesome and functions correctly. focusing especially Reactjs.
          <br />
          <br />
          i'm also a certified graphic designer from <a className="about__rkmscc-link" href="http://www.rkmscc.org/">"Ramakrishna Mission Shilpamandira"</a> i also do graphic and UI designing. and because i love both programming and designing i'm also interested in creating programmatic designs and creative coding projects.
        </p>
      </AboutInfo>

      <Flex justify="space-between" className="quotes__wrapper">
        <Quote>
          <p>“Simplicity is the baddest choice to be the best “</p>
        </Quote>
        <Quote>
          <p>“ I know i’m not successful enough but i’m passionate enough not to worry about success“</p>
        </Quote>
        <Quote>
          <p>“creativity is the driver of a unstoppable train called Passion”</p>
        </Quote>
      </Flex>

    </AboutWrapper>
  )
}

export default About;