import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeminineEnding } from './entities/feminineEndings.entity';
import { MasculineEnding } from './entities/masculineEndings.entity';
import { FrenchWordEndingSeedService } from './endings-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([FeminineEnding, MasculineEnding])],
  providers: [FrenchWordEndingSeedService],
  exports: [FrenchWordEndingSeedService],
})
export class FrenchWordSeedModule {}
