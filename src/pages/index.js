import React from "react";

import Layout from "src/components/Layout/Layout"
import SEO from "src/components/seo";

import Home from "src/components/Home/Home";
import About from "src/components/About/About";
import Skills from 'src/components/Skills/Skills';
import Projects from "src/components/Projects/Projects";
import CreativeCoding from "src/components/CreativeCoding/CreativeCoding";
import Concepts from "src/components/Concepts/Concepts";
import Contact from "src/components/Contact/Contact";


// const Projects = React.lazy(() => import('src/components/Projects/Projects'));
// const CreativeCoding = React.lazy(() => import('src/components/CreativeCoding/CreativeCoding'));
// const Concepts = React.lazy(() => import('src/components/Concepts/Concepts'));

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Home />
    <About />
    <Skills />
    {/* <React.Suspense fallback={<p>loading</p>}> */}
      <Projects />
    {/* </React.Suspense> */}
    <CreativeCoding />
    <Concepts />
    <Contact />

  </Layout>
)

export default IndexPage
