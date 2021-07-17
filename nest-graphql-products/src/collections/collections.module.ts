import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CollectionsResolver } from './collections.resolver';
import { CollectionsService } from './collections.service';

@Module({
  imports: [HttpModule],
  providers: [CollectionsService, CollectionsResolver],
})
export class CollectionsModule {}
