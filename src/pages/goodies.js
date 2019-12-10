import React from "react";
import styled from 'styled-components'

import Layout from "src/components/Layout/Layout"
import SEO from "src/components/seo";

const UnstyledUl = styled.ul`
  list-style: initial;
  margin-left: 15px;
  line-height: 30px;
  font-weight: 600;
`

const Goodies = () => (
  <Layout>
    <SEO title="Anurag Hazra - All Links" />

    <h1>Goodies</h1>
    <p>Collection of all of the project, experiment, source-code links at one place.</p>
    <hr />

    {
      Object.entries(links).map(obj => {
        return (
          <>
            <h2>{obj[0]}</h2>
            <UnstyledUl>
              {
                obj[1].map(link => {
                  return <li><a target="__blank" href={link[0]}>{link[1]}</a></li>
                })
              }
            </UnstyledUl>
          </>
        )
      })
    }
  </Layout>
)

const githubLinks = [
  ['https://github.com/CodingTrain/website/pull/832', 'My 1st GitHub PullRequest'],
  ['https://github.com/MichaelDeBoey/gatsby-remark-embedder', 'gatsby-remark-embedder'],
  ['https://github.com/anuraghazra/gatsby-plugin-social-banners', 'gatsby-plugin-social-banners'],
  ['https://github.com/anuraghazra/gatsby-github-issues-blog', 'gatsby-github-issues-blog'],
  ['https://github.com/anuraghazra/GithubActionsPlayground', 'GithubActionsPlayground'],
  ['https://github.com/anuraghazra/verlet_tests', 'verlet_tests'],
  ['https://github.com/anuraghazra/verlet.js', 'verlet.js'],
  ['https://github.com/anuraghazra/weird-hello-worlds', 'weird-hello-worlds'],
  ['https://github.com/anuraghazra/circleci-test', 'circleci-test'],
  ['https://github.com/anuraghazra/WebGL.js', 'WebGL.js'],
  ['https://github.com/anuraghazra/Candy.js', 'Candy.js'],
  ['https://github.com/anuraghazra/Atomic.js', 'Atomic.js'],
  ['https://github.com/anuraghazra/Nothing', 'Nothing'],
  ['https://github.com/askbuddie/YTBackup', 'YTBackup'],
  ['https://github.com/askbuddie/mini-react-starter', 'mini-react-starter'],
  ['https://github.com/anuraghazra/anuraghazra.github.io-old-react', 'anuraghazra.github.io-old-react'],
  ['https://github.com/anuraghazra/anuraghazra.github.io-old', 'anuraghazra.github.io-old (this one is very old)'],
]
const demoLinks = [
  ['https://anuraghazra.github.io/Verly.js', 'Verly.js'],
  ['https://anuraghazra.github.io/VerlyRangeSlider/', 'VerlyRangeSlider'],
  ['https://anuraghazra.github.io/EvolutionAquerium', 'EvolutionAquerium'],
  ['https://anuraghazra.github.io/ParticleBrush/', 'ParticleBrush'],
  ['https://anuraghazra.github.io/Slime/', 'Slime'],
  ['https://anuraghazra.github.io/FlockingBlackHole/', 'FlockingBlackHole'],
  ['https://anuraghazra.github.io/parasites/', 'parasites'],
  ['https://anuraghazra.itch.io/gyrododge', 'gyrododge'],
  ['https://anuraghazra.github.io/LSystemCreator/', 'LSystemCreator'],
  ['https://anuraghazra.github.io/ShaderExpo/', 'ShaderExpo'],
  ['https://anuraghazra.github.io/VerletDrawing/', 'VerletDrawing'],
  ['https://anuraghazra.github.io/CanvasFun', 'CanvasFun'],
  ['https://anuraghazra.github.io/facebook-reaction-animation', 'facebook-reaction-animation'],
  ['https://anuraghazra.github.io/react-stripe-dropdown', 'react-stripe-dropdown'],
  ['https://simplerockets.herokuapp.com/', 'SimpleRockets - multipler game'],
  ['https://creativechat.herokuapp.com/', 'CreativeChat - drawing chat app'],
  ['http://quickerpoll.herokuapp.com/', 'QuickerPoll - realtime polling site'],
  ['https://nikehyperace.surge.sh/', 'NikeHyperAce'],
  ['http://harleydavidson.surge.sh/', 'Harley Davidson'],
  ['https://anuraghazra.github.io/classicLogo/', 'classicLogo'],
]
const experimentLinks = [
  ['http://whyaskbuddiesucks.surge.sh/', 'whyaskbuddiesucks'],
  ['http://hbd-askbuddie.surge.sh', 'hbd-askbuddie'],
  ['anuraghazra-dev-build.surge.sh', 'anuraghazra-dev-build'],
  ['https://github.com/anuraghazra/NewtonsInterpolation', 'NewtonsInterpolation'],
  ['https://github.com/anuraghazra/YoutubeDownloader', 'YoutubeDownloader'],
  ['https://github.com/anuraghazra/Loader.js', 'Loader.js'],
  ['https://ninjadash.surge.sh/', 'NinjaDash (game i made while i was learning js, not really playable)'],
]

const links = {
  GitHub: githubLinks,
  Demos: demoLinks,
  Experiments: experimentLinks
}

export default Goodies
