import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'src/config/app.config';
import databaseConfig from 'src/config/database.config';
import { DataSource } from 'typeorm';
import { TypeOrmConfigService } from '../typeorm-config.service';
import { RoleSeedModule } from './role/role-seed.module';
import { StatusSeedModule } from './status/status-seed.module';
import { UserSeedModule } from './user/user-seed.module';
import { FrenchWordSeedModule } from './endings/endings-seed.module';
import { WordSeederModule } from './words/words-seed.module';

@Module({
  imports: [
    RoleSeedModule,
    StatusSeedModule,
    UserSeedModule,
    FrenchWordSeedModule,
    WordSeederModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
  ],
})
export class SeedModule {}
