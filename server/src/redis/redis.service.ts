import { Inject, Injectable, Logger } from '@nestjs/common';
import IORedis from 'ioredis';
import { SetValueByKey } from '../interface/redis.interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class RedisService {
	redis: IORedis.Redis;

	constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly loggerService: Logger) {}

	async login(options: IORedis.RedisOptions): Promise<boolean> {
		let result: false | IORedis.Redis;
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
		return await this.redis.keys(pattern);
	}

	async getValueByKey(key: IORedis.KeyType): Promise<string> {
		return await this.redis.get(key);
	}

	async deleteKey(...key: IORedis.KeyType[]): Promise<number> {
		return await this.redis.del(...key);
	}

	async setValueByKey({ key, value, expiryMode = 'EX', time = 300, setMode = 'NX' }: SetValueByKey): Promise<string> {
		return await this.redis.set(key, value, expiryMode, time, setMode);
	}

	async getKeyOfTtl(key: IORedis.KeyType): Promise<number> {
		return await this.redis.ttl(key);
	}

	async setExpireOfKey(key: IORedis.KeyType, expireTime: number): Promise<1 | 0> {
		return await this.redis.expire(key, expireTime);
	}

	async renameKey(key: IORedis.KeyType, newKey: IORedis.KeyType): Promise<string> {
		return await this.redis.rename(key, newKey);
	}

	async checkKeyExist(key: IORedis.KeyType): Promise<number> {
		return await this.redis.exists(key);
	}

	async selectDb(db: number) {
		const result = await this.redis.select(db);
		if (result === 'OK') {
			return db;
		}
		return -1;
	}

	// connect redis
	private async connect(param: IORedis.RedisOptions): Promise<false | IORedis.Redis> {
		return new Promise<false | IORedis.Redis>((resolve, reject) => {
			const redis = new IORedis(param);
			redis.on('ready', () => resolve(redis));
			redis.on('error', e => {
				redis.quit();
				return reject(e);
			});
		});
	}
}
