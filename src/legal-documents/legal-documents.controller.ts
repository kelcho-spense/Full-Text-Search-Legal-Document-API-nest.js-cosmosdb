import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ParseIntPipe,
  ParseArrayPipe,
} from '@nestjs/common';
import { LegalDocumentsService } from './legal-documents.service';
import { CreateLegalDocumentDto } from './dto';

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
  @Get('fulltext')
  async searchFullText(
    @Query('q') searchText: string,
    @Query('top', ParseIntPipe) top: number = 10,
  ) {
    return this.legalDocumentsService.searchByFullText(searchText, top);
  }

  @Get('fulltext/all')
  async searchAllKeywords(
    @Query('keywords', new ParseArrayPipe({ items: String, separator: ',' }))
    keywords: string[],
    @Query('top', ParseIntPipe) top: number = 10,
  ) {
    return this.legalDocumentsService.searchByAllKeywords(keywords, top);
  }
  @Get('fulltext/any')
  async searchAnyKeyword(
    @Query('keywords', new ParseArrayPipe({ items: String, separator: ',' }))
    keywords: string[],
    @Query('top', ParseIntPipe) top: number = 10,
  ) {
    return this.legalDocumentsService.searchByAnyKeyword(keywords, top);
  }

  @Get('fulltext/relevant')
  async searchWithRelevance(
    @Query('keywords', new ParseArrayPipe({ items: String, separator: ',' }))
    keywords: string[],
    @Query('top', ParseIntPipe) top: number = 10,
  ) {
    return this.legalDocumentsService.searchWithRelevanceScore(keywords, top);
  }
}
