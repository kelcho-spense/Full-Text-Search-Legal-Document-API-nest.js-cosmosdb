import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { LegalDocumentsService } from './legal-documents.service';
import { CreateLegalDocumentDto } from './dto/create-legal-document.dto';

@Controller('legal-documents')
export class LegalDocumentsController {
  constructor(private readonly legalDocumentsService: LegalDocumentsService) {}

  @Post()
  create(@Body() createLegalDocumentDto: CreateLegalDocumentDto) {
    return this.legalDocumentsService.create(createLegalDocumentDto);
  }

  @Get()
  findAll() {
    return this.legalDocumentsService.findAll();
  }
  @Get('search')
  async search(
    @Query('q') searchText: string,
    @Query('top', ParseIntPipe) top: number = 10,
  ) {
    return this.legalDocumentsService.searchByContent(searchText, top);
  }
}
