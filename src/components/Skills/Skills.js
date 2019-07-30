import React from "react";
import styled from 'styled-components';
// import { useSpring, animated, interpolate } from 'react-spring'

import PageHeader from 'src/components/common/PageHeader';
import SkillPie from "src/components/Skills/SkillPie";
import { Row, Col, Hidden } from "react-grid-system";

const SkillsWrapper = styled.section`
  ${props => props.theme.spacing.sectionBottom};
  position: relative;

  .skills__word-clouds {
    p {
      position: absolute;
      color: ${props => props.theme.accentColor};
      z-index: -10;
      left: 0;
      right: 0;
      font-weight: 900;
    }
  }
`
const WordClouds = () => {
  // const [{ y }, set] = useSpring(() => ({ y: 0 }))

  // const onMove = useCallback(({ clientX: x, clientY: y }) => {
  //   set({ x: x - window.innerWidth / 2, y: y - window.innerHeight / 2 })
  // }, [])
  // const onScroll = useCallback((e) => {
  //   console.log(e.target.scrollTop)
  //   set({ y: e.target.scrollTop / 30 })
  // }, []);

  // useEffect(() => window.addEventListener('scroll', (e) => {
  //   set({ y: window.scrollY })
  // }), []);

  // const interpClouds = y.interpolate(o => `translate(0, ${-o / 8}px)`);
  // style={{ transform: interpClouds }} 
  return (
    <div aria-hidden="true" className="skills__word-clouds">
      <p style={{ top: 50, left: '100%', fontSize: 23 }}>HTML5</p>
      <p style={{ top: 0, left: 0, fontSize: 25 }}>WebGL</p>
      <p style={{ top: 200, left: -60, fontSize: 14 }}>CSS3</p>
      <p style={{ top: '30%', left: '50%', fontSize: 18 }}>figma</p>
      <p style={{ top: 40, left: '75%', fontSize: 12 }}>antd</p>
      <p style={{ top: 380, left: '80%', fontSize: 18 }}>MongoDB</p>
      <p style={{ top: 320, left: '42%', fontSize: 18 }}>Nodejs</p>
      <p style={{ top: 350, left: 150, fontSize: 20 }}>ES6</p>
      <p style={{ top: 120, left: '22%', fontSize: 12 }}>blender</p>
    </div>
  )
}

const Skills = () => {

  return (
    <SkillsWrapper>
      <PageHeader>My Skillsets</PageHeader>

      <Row justify="between" align="center">
        <Col sm={12} md={3}>
          <SkillPie percent={90} name={"JavaScript"} />
        </Col>
        <Col sm={12} md={3}>
          <SkillPie percent={75} name={"React"} />
        </Col>
        <Col sm={12} md={3}>
          <SkillPie percent={95} name={"Canvas"} />
        </Col>
        <Col sm={12} md={3}>
          <SkillPie percent={65} name={"UI/UX"} />
        </Col>
      </Row>

      <Hidden xs sm>
        <WordClouds />
      </Hidden>

    </SkillsWrapper>
  )
}

export default Skills;