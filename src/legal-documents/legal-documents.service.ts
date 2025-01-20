import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateLegalDocumentDto } from './dto/create-legal-document.dto';

@Injectable()
export class LegalDocumentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  // ...existing code...

  async searchByFullText(searchText: string, top: number = 10) {
    const container = this.databaseService.getContainer();
    const querySpec = {
      query: `
        SELECT TOP @top *
        FROM c 
        WHERE FullTextContains(c.content, @searchText)
        ORDER BY c._ts DESC
      `,
      parameters: [
        { name: '@searchText', value: searchText },
        { name: '@top', value: top },
      ],
    };
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources;
  }

  async searchByAllKeywords(keywords: string[], top: number = 10) {
    const container = this.databaseService.getContainer();
    const querySpec = {
      query: `
        SELECT TOP @top *
        FROM c 
        WHERE FullTextContainsAll(c.content, ${keywords.map((_, i) => `@kw${i}`).join(', ')})
        ORDER BY c._ts DESC
      `,
      parameters: [
        ...keywords.map((kw, i) => ({ name: `@kw${i}`, value: kw })),
        { name: '@top', value: top },
      ],
    };
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources;
  }

  async searchByAnyKeyword(keywords: string[], top: number = 10) {
    const container = this.databaseService.getContainer();
    const querySpec = {
      query: `
        SELECT TOP @top *
        FROM c 
        WHERE FullTextContainsAny(c.content, ${keywords.map((_, i) => `@kw${i}`).join(', ')})
        ORDER BY c._ts DESC
      `,
      parameters: [
        ...keywords.map((kw, i) => ({ name: `@kw${i}`, value: kw })),
        { name: '@top', value: top },
      ],
    };
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources;
  }

  async searchWithRelevanceScore(keywords: string[], top: number = 10) {
    const container = this.databaseService.getContainer();
    const querySpec = {
      query: `
        SELECT TOP @top *
        FROM c 
        ORDER BY RANK FullTextScore(c.content, ${keywords.map((_, i) => `@kw${i}`).join(', ')})
      `,
      parameters: [
        ...keywords.map((kw, i) => ({ name: `@kw${i}`, value: kw })),
        { name: '@top', value: top },
      ],
    };
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources;
  }
}
