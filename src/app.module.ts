import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { LegalDocumentsModule } from './legal-documents/legal-documents.module';
import { LegalDocumentsService } from './legal-documents/legal-documents.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MyLoggerModule,
    DatabaseModule,
    LegalDocumentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, LegalDocumentsService],
})
export class AppModule {}
