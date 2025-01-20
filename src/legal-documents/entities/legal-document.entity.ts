export class LegalDocument {
  id?: string;
  title: string;
  content: string;
  documentType: string;
  dateCreated: Date;
  metadata: {
    author: string;
    version: string;
    tags: string[];
  };
}
