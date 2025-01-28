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
  ],
  // Define composite indexes for ordering and filtering
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
