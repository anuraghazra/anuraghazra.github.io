import React from "react";

import {
  ProjectContent,
  ProjectDetail,
  ProjectWrapper,
} from './ProjectTemplate.style'

const ProjectTemplate = ({ title, desc, links, preview }) => {
  return (
    <ProjectWrapper>
      <ProjectContent>
        <ProjectDetail>
          <div className="project__detail-container">
            <h2>{title}</h2>
            <p>{desc}</p>
            {links}
          </div>
        </ProjectDetail>

        {preview}
      </ProjectContent>
    </ProjectWrapper>
  )
}

export default ProjectTemplate;