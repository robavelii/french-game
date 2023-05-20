import { NestFactory } from '@nestjs/core';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { StatusSeedService } from './status/status-seed.service';
import { UserSeedService } from './user/user-seed.service';
import { FrenchWordEndingSeedService } from './endings/endings-seed.service';
import { WordSeederService } from './words/words-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run;
  await app.get(RoleSeedService).run();
  await app.get(StatusSeedService).run();
  await app.get(UserSeedService).run();
  await app.get(FrenchWordEndingSeedService).run();
  await app.get(WordSeederService).run();

  await app.close();
};

void runSeed();
