import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { RedisModule } from '../redis/redis.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '6h' }
		}),
		forwardRef(() => RedisModule)
	],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService]
})
export class AuthModule {}
