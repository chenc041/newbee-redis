import { Inject, Injectable, Logger } from '@nestjs/common';
import { RedisOptions, RedisKey } from 'ioredis';
import Redis from 'ioredis';
import { SetValueByKey } from '../interface/redis.interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class RedisService {
	redis: Redis;
	constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly loggerService: Logger) {}

	async login(options: RedisOptions): Promise<boolean> {
		let result: false | Redis;
		this.loggerService.log('options', options);
		try {
			result = await this.connect(options);
			if (result) {
				this.redis = result;
			}
			return true;
		} catch (e) {
			this.loggerService.error('login error', e);
			return false;
		}
	}

	async keys(pattern: string): Promise<string[]> {
		return this.redis.keys(pattern);
	}

	async getValueByKey(key: RedisKey): Promise<string> {
		return this.redis.get(key);
	}

	async deleteKey(...key: RedisKey[]): Promise<number> {
		return this.redis.del(...key);
	}

	async setValueByKey({ key, value, expiryMode = 'EX', time = 300, setMode = 'NX' }: SetValueByKey): Promise<string> {
		return this.redis.set(key, value, expiryMode, time, setMode);
	}

	async getKeyOfTtl(key: RedisKey): Promise<number> {
		return this.redis.ttl(key);
	}

	async setExpireOfKey(key: RedisKey, expireTime: number | string): Promise<any> {
		return this.redis.expire(key, expireTime);
	}

	async renameKey(key: RedisKey, newKey: RedisKey): Promise<string> {
		return this.redis.rename(key, newKey);
	}

	async checkKeyExist(key: RedisKey): Promise<number> {
		return this.redis.exists(key);
	}

	async selectDb(db: number) {
		const result = await this.redis.select(db);
		if (result === 'OK') {
			return db;
		}
		return -1;
	}

	// connect redis
	private async connect(param: RedisOptions): Promise<false | Redis> {
		return new Promise<false | Redis>((resolve, reject) => {
			const redis = new Redis(param);
			redis.on('ready', () => resolve(redis));
			redis.on('error', e => {
				redis.quit();
				return reject(e);
			});
		});
	}
}
