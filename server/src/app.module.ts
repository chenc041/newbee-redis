import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from './config/winston-config.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
	imports: [
		RedisModule,
		WinstonModule.forRootAsync({
			useClass: WinstonConfigService
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'client')
		})
	]
})
export class AppModule {}
