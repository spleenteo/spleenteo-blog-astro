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
      category {
        id
      }
    }
  }
`);

interface Category {
  description: string;
  id: string;
  name: string;
  slug: string;
}

interface Post {
  category: {
    id: string;
  };
}

interface QueryResult {
  allCategories: Category[];
  allPosts: Post[];
}

async function ActiveCategories(options = {}) {
  const result = (await executeQuery(query, options)) as QueryResult;
  const { allPosts, allCategories } = result;

  const categories = allCategories.map((cat: { id: string }) => {
    const matching = allPosts.filter((p) => p.category.id == cat.id);
    return matching.length > 0 ? cat : null;
  });
  const catsWithPosts = categories.filter((c) => !!c);

  return catsWithPosts;
}

export default ActiveCategories;
