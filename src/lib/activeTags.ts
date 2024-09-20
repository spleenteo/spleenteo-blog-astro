import { executeQuery } from '~/lib/datocms/executeQuery';
import { graphql } from '~/lib/datocms/graphql';

export default async function activeTags() {
  const query = graphql(
    /* GraphQL */ `
      query ActiveTagsQuery {
        allTags {
          id
          name
          slug
        }
      }
    `,
  );

  const { allTags } = await executeQuery(query);
  return allTags;
}
