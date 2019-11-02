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

const IndexPage = () => (
  <Layout>
    <SEO title="Anurag Hazra - Creative Web Designer" />

    <Home />
    <About />
    <Skills />
    <Projects />
    <CreativeCoding />
    <Concepts />
    <Contact />

  </Layout>
)

export default IndexPage
