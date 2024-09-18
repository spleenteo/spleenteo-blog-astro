import { graphql } from '~/lib/datocms/graphql';
import { executeQuery } from '~/lib/datocms/executeQuery';

const query = graphql(`
  {
    allCategories {
      description
      id
      name
      slug
    }
    allPosts {
      category{
        id
      }
    }
  }
`);

async function ActiveCategories(options = {}) {
  const result = await executeQuery(query, options);
  const { allPosts, allCategories } = result;

  const categories = allCategories.map(cat => {
    const matching = allPosts.filter(p => p.category.id == cat.id);
    return matching.length > 0 ? cat : null;
  });
  const catsWithPosts = categories.filter(c => !!c);

  return catsWithPosts;
}

export default ActiveCategories;
