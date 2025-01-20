import { IndexingPolicy, FullTextPolicy } from '@azure/cosmos';

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
  compositeIndexes: [
    [
      {
        path: '/dateCreated',
        order: 'descending',
      },
      {
        path: '/documentType',
        order: 'ascending',
      },
    ],
  ],
};

export const legalDocumentFullTextPolicy: FullTextPolicy = {
  defaultLanguage: 'en-US',
  fullTextPaths: [
    {
      language: 'en-US',
      path: '/content',
    },
    {
      path: '/title',
      language: 'en-US',
    },
    {
      path: '/metadata/tags/*',
      language: 'en-US',
    },
    {
      path: '/metadata/author',
      language: 'en-US',
    },
    {
      path: '/metadata/version',
      language: 'en-US',
    },
  ],
};
