import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            authors {
              biography
              name
              id
              picture {
                url
              }
            }
            date
            slug
            title
            excerpt
            coverImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

export const getCategories = async () => {
  const query = gql`
    query GetGategories {
        categories {
          name
          slug
        }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categories;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        coverImage {
          url
        }
        authors{
          name
          biography
          picture {
            url
          }
        }
        date
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        coverImage {
          url
        }
        date
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories });

  return result.posts;
};

export const getAdjacentPosts = async (date, slug) => {
  const query = gql`
    query GetAdjacentPosts($date: Date!,$slug:String!) {
      next:posts(
        first: 1
        orderBy: date_ASC
        where: {slug_not: $slug, AND: {date_gte: $date}}
      ) {
        title
        coverImage {
          url
        }
        date
        slug
      }
      previous:posts(
        first: 1
        orderBy: date_DESC
        where: {slug_not: $slug, AND: {date_lte: $date}}
      ) {
        title
        coverImage {
          url
        }
        date
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, date });

  return { next: result.next[0], previous: result.previous[0] };
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            authors {
              biography
              name
              id
              picture {
                url
              }
            }
            date
            slug
            title
            excerpt
            coverImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        authors {
          name
          picture {
            url
          }
        }
        coverImage {
          url
        }
        title
        slug
        date
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const submitComment = async (obj) => {
  const result = await fetch(graphqlAPI + '/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}){
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: date_ASC
        last: 3
      ) {
        title
        coverImage {
          url
        }
        date
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};
