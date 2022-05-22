import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from 'src/config/winston-config.service';

@Module({
	imports: [
		RedisModule,
		WinstonModule.forRootAsync({
			useClass: WinstonConfigService
		})
	]
})
export class AppModule {}
