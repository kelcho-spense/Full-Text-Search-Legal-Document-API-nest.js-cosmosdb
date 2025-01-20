import { IndexingPolicy } from '@azure/cosmos';

export const legalDocumentIndexingPolicy: IndexingPolicy = {
  indexingMode: 'consistent',
  automatic: true,
  // Define the paths to be included in the index
  includedPaths: [
    {
      path: '/*',
    },
  ],
  // Define the paths to be excluded from the index
  excludedPaths: [
    {
      path: '/"_etag"/?',
    },
    {
      path: '/vector/*',
    },
  ],
  // Define the composite indexes for full text policy
  fullTextIndexes: [
    {
      path: '/content',
    },
    {
      path: '/title',
    },
    {
      path: '/documentType',
    },
    {
      path: '/metadata/author',
    },
    {
      path: '/metadata/tags',
    },
    {
      path: '/metadata/version',
    },
  ],
};
