import { FullTextPolicy } from '@azure/cosmos';

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
