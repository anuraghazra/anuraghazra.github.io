import React from "react";
// import { Link } from "gatsby"

import Layout from "src/components/Layout/Layout"
import SEO from "src/components/seo";

import Home from "src/components/Home/Home";
import About from "src/components/About/About";
import Skills from 'src/components/Skills/Skills';
import Projects from "src/components/Projects/Projects";
import CreativeCoding from "src/components/CreativeCoding/CreativeCoding";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    
    <Home />
    <About />
    <Skills />
    <Projects />
    <CreativeCoding />

  </Layout>
)

export default IndexPage
