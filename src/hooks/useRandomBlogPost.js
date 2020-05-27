import { useStaticQuery, graphql } from 'gatsby';

export const randomGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const useRandomBlogPost = () => {
  const blogposts = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(filter: { fields: { posttype: { eq: "blog" } } }) {
          edges {
            node {
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
          totalCount
        }
      }
    `
  );

  let randomPost =
    blogposts.allMarkdownRemark.edges[
      randomGenerator(0, blogposts.allMarkdownRemark.totalCount - 1)
    ];

  // make sure we don't have redundant randomPost
  if (typeof window !== 'undefined') {
    while (randomPost.node.fields.slug === window.location.pathname) {
      randomPost =
        blogposts.allMarkdownRemark.edges[
          randomGenerator(0, blogposts.allMarkdownRemark.totalCount - 1)
        ];
      // don't wanna run it second time
      break;
    }
  }

  return {
    randomSlug: randomPost.node.fields.slug,
    randomTitle: randomPost.node.frontmatter.title,
  };
};
export default useRandomBlogPost;
