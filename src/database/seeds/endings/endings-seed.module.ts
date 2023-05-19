import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeminineEnding } from './entities/feminineEndings.entity';
import { MasculineEnding } from './entities/masculineEndings.entity';
import { FrenchWordSeedService } from './endings-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([FeminineEnding, MasculineEnding])],
  providers: [FrenchWordSeedService],
  exports: [FrenchWordSeedService],
})
export class FrenchWordSeedModule {}
