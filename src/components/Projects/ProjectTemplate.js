import React from "react";
import IFrame from 'src/components/common/IFrame';
import Button, { IconButton } from 'src/components/common/Button';

import {
  ProjectContent,
  ProjectDetail,
  ProjectLinks,
  ProjectPreview,
  ProjectWrapper,
  Tags
} from './ProjectTemplate.style'

const ProjectTemplate = ({ title, desc, links }) => {
  return (
    <ProjectWrapper>
      <ProjectContent>
        <ProjectDetail>
          <div className="project__detail-container">
            <h2>{title}</h2>
            <p>
              {desc}
            </p>
            <ProjectLinks>
              <Button as="a" href="/">Case Study</Button>
              <Button as="a" href={links.demo}>Live Demo</Button>
              <IconButton as="a" href={links.src} className="fab fa-github" />
            </ProjectLinks>
          </div>
        </ProjectDetail>

        <ProjectPreview>
          <IFrame src={links.video} />
          <Tags>
            <i className="fab fa-js" />
            <i className="fab fa-html5" />
            <i className="fab fa-css3" />
          </Tags>
        </ProjectPreview>
      </ProjectContent>
    </ProjectWrapper>
  )
}

export default ProjectTemplate;