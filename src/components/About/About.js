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
          Hi, I'm Anurag Hazra, a self-taught passionate FrontEnd developer from
          India, currently working at{' '}
          <a className="about__link" href="https://razorpay.com">
            Razorpay
          </a>{' '}
          as a FrontEnd engineer. I've been building stuff on the web since when
          I was in 6th standard, I've made countless side projects and I also
          posses magical powers of using react to build delightful user
          interfaces.
          <br />
          <br />I also love doing <b>open source</b> development, I actively
          maintain various notable open source projects with over, <br />
          <b>30k+ stars on GitHub</b> and <b>50m+ hits</b>. It gives me a
          wonderful feeling of achievement and joy which I cannot explain in
          words.
        </p>
      </AboutInfo>

      <Flex justify="space-between" className="quotes__wrapper">
        <Quote>
          <p>“Simplicity is the baddest choice to be the best.“</p>
        </Quote>
        <Quote>
          <p>
            “I know I’m not successful enough, but I’m passionate enough not to
            worry about success.“
          </p>
        </Quote>
        <Quote>
          <p>
            “Creativity is the driver of an unstoppable train called Passion.”
          </p>
        </Quote>
      </Flex>
    </AboutWrapper>
  );
};

export default About;
