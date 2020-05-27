import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ProjectLinks } from './ProjectTemplate.style';
import { CardText } from '@common/Card';
import Button, { IconButton } from '@common/Button';

// import svg from '@src/static/skew_bg.svg'

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  autoplay: true,
  autoplaySpeed: 4000,
  slidesToShow: 3,
  slidesToScroll: 1,
  draggable: true,
  centerMode: true,
  centerPadding: '40px',
  swipeToSlide: true,
  arrows: false,
  accessibility: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        centerPadding: '15px',
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        speed: 500,
        slidesToShow: 1,
        centerPadding: '15px',
      },
    },
  ],
};

const InnerContent = styled.div`
  padding: 190px 0;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

const BG = styled.div`
  position: absolute;
  background: ${p =>
    p.theme.dark ? p.theme.secondaryColor : p.theme.gradient};
  transform: skewY(-3deg);
  right: 0;
  left: 0;
  width: 100%;
  min-height: 630px;
  max-height: 740px;
`;
const SmallProjectWrapper = styled.section`
  ${props => props.theme.spacing.sectionBottom};

  margin-top: 100px;

  width: 100%;
  height: 100%;

  .slick-slide {
    padding: 10px;
  }
`;

const SmallProjectCard = styled.div`
  /* because of project links */
  position: relative;
  
  background-color: ${props => props.theme.bg};
  border-radius: 10px;
  padding: 30px;
  height: 280px;

  h3 {
    /* color: ${props => props.theme.primaryColor}; */
    margin-bottom: 5px;
  }

  .smallproject__links {
    position: absolute;
    bottom: 20px;
  }
`;

const SmallProjects = () => {
  const smallprojects = useStaticQuery(
    graphql`
      query {
        allSmallprojectsJson {
          edges {
            node {
              id
              title
              links {
                demo
                src
              }
              description
            }
          }
        }
      }
    `
  );

  return (
    <SmallProjectWrapper>
      <BG />
      <InnerContent>
        <Slider {...settings}>
          {smallprojects.allSmallprojectsJson.edges.map(({ node }) => (
            <SmallProjectCard key={node.id}>
              <h3>{node.title}</h3>
              <CardText>{node.description}</CardText>
              <ProjectLinks className="smallproject__links">
                <Button target="__blank" as="a" href={node.links.demo}>
                  Live Demo
                </Button>
                <IconButton
                  label="github"
                  href={node.links.src}
                  icon={['fab', 'github']}
                />
              </ProjectLinks>
            </SmallProjectCard>
          ))}
        </Slider>
      </InnerContent>
    </SmallProjectWrapper>
  );
};

export default SmallProjects;
