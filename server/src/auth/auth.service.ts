import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { RedisOptions } from 'ioredis';

@Injectable()
export class AuthService {
	constructor(private readonly redisService: RedisService, private readonly jwtService: JwtService) {}

	async login(payload: RedisOptions & { name: string }) {
		const result = await this.redisService.login(payload);
		if (!result) {
			throw new UnauthorizedException('身份验证失败!');
		}
		return {
			accessToken: this.signToken({ name: payload.name, db: payload.db })
		};
	}

	private signToken(payload: { name: string; db: number }) {
		return this.jwtService.sign(payload);
	}
}
