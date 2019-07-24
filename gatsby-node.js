const axios = require('axios');
const crypto = require('crypto');
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

exports.sourceNodes = async ({ actions, createNodeId, node, store, cache }) => {
  const { createNode, createNodeField } = actions;

  const CC_PROJECTS_URI = 'https://anuraghazra.github.io/CanvasFun/data.json';

  // GET JSON FILE
  const createCreativeNode = async (project, i) => {
    const projectNode = {
      children: [],
      id: `${i}`,
      parent: `__SOURCE__`,
      internal: {
        type: `CreativeCoding`,
      },
      ...project
    }

    // Get content digest of node. (Required field)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(projectNode))
      .digest(`hex`);
    projectNode.internal.contentDigest = contentDigest;

    createNode(projectNode);
  }

  // GET THE THUMBNAILS
  const createRemoteImage = async (project, i) => {
    try {
      await createRemoteFileNode({
        id: `${i}`,
        url: project.img,
        store,
        cache,
        createNode,
        createNodeId
      });
    } catch (error) {
      console.warn('error creating node', error);
    }
  }

  let res = await axios.get(CC_PROJECTS_URI);
  
  return res.data.forEach((project, i) => {
    const nodeData = createRemoteImage(project, i);
    createCreativeNode(project, i);
    createNode(nodeData);
  });
}