import { Injectable } from '@nestjs/common';
import { CreateLegalDocumentDto } from './dto/create-legal-document.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LegalDocumentsService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createLegalDocumentDto: CreateLegalDocumentDto) {
    return 'This action adds a new legalDocument';
  }

  findAll() {
    return `This action returns all legalDocuments`;
  }

  async searchByContent(searchText: string, top: number) {
    const container = this.databaseService.getContainer();
    const querySpec = {
      query: `
        SELECT * FROM c 
        WHERE CONTAINS(c.content, @searchText, true)
        ORDER BY c._ts DESC
        OFFSET 0 LIMIT @top
      `,
      parameters: [
        { name: '@searchText', value: searchText },
        { name: '@top', value: top },
      ],
    };

    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources;
  }
}
