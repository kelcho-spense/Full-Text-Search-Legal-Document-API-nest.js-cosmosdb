import { PartialType } from '@nestjs/mapped-types';
import { CreateLegalDocumentDto } from './create-legal-document.dto';

export class UpdateLegalDocumentDto extends PartialType(
  CreateLegalDocumentDto,
) {}
