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
          <Avatar src="hfest_avatar_2.jpg" />
        </div>
        <p>
          Hi, I am Darshan Sudhakar, a passionate C# and .NET developer
          from India, currently working at{' '}
          <a className="about__link" href="https://fnfindia.co.in/">
          fnfindia.co.in
          </a>{' '}
          as a Winforms developer.
          <br />
          <br />
          My core focus is on solving technical problem using .NET and C#.
          It give me great pleasure helping college passout to understand industry best practices.
        </p>
      </AboutInfo>

      {/* TODO : Add authors */}
      <Flex justify="space-between" className="quotes__wrapper">
        <Quote>
          <p>“If you wanna master something. Teach it!“</p>
        </Quote>
        <Quote>
          <p>
            “Simplicity is the ultimate sophistication“
          </p>
        </Quote>
        <Quote>
          <p>
            “Never let a good crisis go waste”
          </p>
        </Quote>
      </Flex>
    </AboutWrapper>
  );
};

export default About;
