import { Module } from '@nestjs/common';
import { LegalDocumentsService } from './legal-documents.service';
import { LegalDocumentsController } from './legal-documents.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [LegalDocumentsController],
  providers: [LegalDocumentsService, DatabaseService],
})
export class LegalDocumentsModule {}
