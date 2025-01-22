import { Injectable } from '@nestjs/common';
import { LegalDocumentsService } from './legal-documents/legal-documents.service';
import { LegalDocument } from './legal-documents/entities/legal-document.entity';
import { faker } from '@faker-js/faker/locale/en_US';

@Injectable()
export class AppService {
  constructor(private readonly legalDocumentsService: LegalDocumentsService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async generateFakeLegalDocuments(
    legalDocumentsNumber: number = 20,
  ): Promise<{ message: string; documents: any[] }> {
    const documentTypes = ['contract', 'agreement', 'policy', 'license', 'nda'];
    const tags = [
      'legal',
      'contract',
      'agreement',
      'business',
      'confidential',
      'commercial',
    ];

    const documents: LegalDocument[] = Array.from(
      { length: legalDocumentsNumber },
      () => ({
        title: `${faker.word.adjective()} ${faker.word.noun()} ${faker.helpers.arrayElement(documentTypes)}`,
        content: `${faker.lorem.paragraphs(3)} ${faker.helpers.arrayElements(tags, 2).join(' ')} ${faker.lorem.paragraphs(2)}`,
        documentType: faker.helpers.arrayElement(documentTypes),
        metadata: {
          author: faker.person.fullName(),
          version: faker.system.semver(),
          tags: faker.helpers.arrayElements(tags, 3),
        },
        dateCreated: faker.date.recent({ days: 365 }),
      }),
    );
    const results = await Promise.all(
      documents.map((doc) => this.legalDocumentsService.create(doc)),
    );

    return {
      message: `Generated ${results.length} documents`,
      documents: results,
    };
  }
}
