import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { AuthModule } from '~/auth/auth.module';

@Module({
	imports: [PassportModule.register({ defaultStrategy: 'jwt' }), forwardRef(() => AuthModule)],
	exports: [RedisService],
	providers: [RedisService],
	controllers: [RedisController]
})
export class RedisModule {}
