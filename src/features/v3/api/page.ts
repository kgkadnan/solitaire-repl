import { fetchAPI } from './base-query';

export async function getAllPagesWithSlug() {
  const data = await fetchAPI(`
    {
      pages(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.pages.edges;
}

export async function getPageBySlug(slug: any) {
  const query = `
    query PageBySlug($slug: String!) {
      pageBy(uri: $slug) {
        title
        content
        slug
      }
    }
  `;
  const variables = { slug };
  const data = await fetchAPI(query, { variables });
  return data.pageBy;
}
