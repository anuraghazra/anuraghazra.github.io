import React from "react";
import { graphql } from "gatsby"

import Layout from "src/components/Layout/Layout"

import SEO from "src/components/seo";

import Flex from "../components/common/Flex";
import IFrame from 'src/components/common/IFrame';
import Button, { IconButton } from 'src/components/common/Button';
import { ProjectLinks } from 'src/components/Projects/ProjectTemplate.style';

import { InfoTitle, CaseStudyWrapper } from './case-study.style'

const CaseStudy = ({ data }) => {
  const study = data.markdownRemark.frontmatter;

  const infoLinks = (
    study.info.links &&
    <div>
      <InfoTitle>Links & Resources</InfoTitle>
      <ul>
        {study.info.links.map((link, i) => (
          <li key={i}>
            <a href={link[1]}>{link[0]}</a>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <Layout>
      <SEO title={study.title} />
      <CaseStudyWrapper>
        <Flex className="case__title" justify="space-between" align="center">
          <h1>{study.title}</h1>

          <ProjectLinks className="case__links">
            <Button target="__blank" as="a" href={study.demo}>Live Demo</Button>
            <IconButton label="github" icon={["fab", "github"]} href={study.src} />
          </ProjectLinks>
        </Flex>

        <section className="case__info">
          <div>
            <aside>
              <InfoTitle>Idea</InfoTitle>
              <p>{study.info.idea}</p>
            </aside>
            <aside>
              <InfoTitle>Core Technologies</InfoTitle>
              <ul>
                {study.info.tech.map((tech, i) => <li key={i}>{tech}</li>)}
              </ul>
            </aside>
            {infoLinks}
          </div>
          <div className="case__iframe-container">
            <IFrame src={study.iframe} />
          </div>
        </section>

        <article className="markdown-content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </CaseStudyWrapper>
    </Layout>
  )
}

export const query = graphql`
  query caseStudyBySlug($slug : String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      id
      html
      frontmatter {
        demo
        iframe
        src
        title
        info {
          idea
          links
          tech
        }
      }
    }
  }
`

export default CaseStudy
