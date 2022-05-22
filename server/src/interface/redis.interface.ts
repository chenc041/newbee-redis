import IORedis from 'ioredis';

/** 类型文件 **/

export interface SetValueByKey {
	key: IORedis.KeyType;
	value: IORedis.ValueType;
	expiryMode?: 'PX' | 'EX';
	time?: number | string;
	setMode?: 'NX' | 'XX';
}

export class ExpireOfKey {
	key: IORedis.KeyType;
	expireTime: number;
}

export class RenameKey {
	key: IORedis.KeyType;
	newKey: IORedis.KeyType;
}

export interface Response<T> {
	data: T;
	statusCode: number;
}
