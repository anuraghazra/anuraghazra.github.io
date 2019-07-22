import React from "react";
import styled from 'styled-components';

import PageHeader from 'src/components/common/PageHeader';
import SkillPie from "src/components/Skills/SkillPie";
import { Row, Col } from "react-grid-system";

const SkillsWrapper = styled.section`
  ${props => props.theme.spacing.sectionBottom};
`

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

    </SkillsWrapper>
  )
}

export default Skills;