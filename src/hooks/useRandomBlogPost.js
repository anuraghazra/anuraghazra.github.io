import { useStaticQuery, graphql } from 'gatsby';

export const randomGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const useRandomBlogPost = () => {
  const blogposts = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(filter: {fields: {posttype: {eq: "blog"}}}){
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
  )

  const randomPost = blogposts.allMarkdownRemark.edges[
    randomGenerator(
      0,
      blogposts.allMarkdownRemark.totalCount - 1
    )
  ];

  return { randomSlug: randomPost.node.fields.slug, randomTitle: randomPost.node.frontmatter.title };
}
export default useRandomBlogPost;
