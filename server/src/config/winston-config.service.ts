import winston from 'winston';
import 'winston-daily-rotate-file';
import { Injectable } from '@nestjs/common';
import { WinstonModuleOptions, WinstonModuleOptionsFactory } from 'nest-winston';

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
	createWinstonModuleOptions(): WinstonModuleOptions {
		const { NODE_ENV } = process.env;
		const transports: any[] = [];
		if (NODE_ENV === 'development') {
			transports.push(new winston.transports.Console());
		} else {
			const fileInfoTransport = new winston.transports.DailyRotateFile({
				level: 'info',
				maxSize: '5m',
				maxFiles: '14d',
				zippedArchive: true,
				datePattern: 'YYYY-MM-DD',
				filename: 'log/redis-server-info-%DATE%.log'
			});

			const fileErrorTransport = new winston.transports.DailyRotateFile({
				level: 'error',
				maxSize: '5m',
				maxFiles: '14d',
				zippedArchive: true,
				datePattern: 'YYYY-MM-DD-HH',
				filename: 'log/redis-server-error-%DATE%.log'
			});
			transports.push(fileInfoTransport);
			transports.push(fileErrorTransport);
		}
		return {
			format: winston.format.json(),
			transports: transports,
			defaultMeta: { appName: 'redisConnectServer' }
		};
	}
}
