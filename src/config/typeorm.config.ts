import { ConfigModule, ConfigService } from '@nestjs/config';
import {
	TypeOrmModuleAsyncOptions,
	TypeOrmModuleOptions
} from '@nestjs/typeorm';

export default class TypeOrmConfig {
	static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
		return {
			type: 'postgres',

			host: configService.get('DB_HOST') || 'localhost',

			port: parseInt(configService.get('DB_PORT')) || 5432,

			username: configService.get('DB_USER'),

			password: configService.get('DB_USER_PWD'),

			database: configService.get('DB_NAME') || 'nest-db',

			entities: [`${__dirname}/../**/entities/*.entity{.ts,.js}`],

			synchronize: true

			// logging: true
		};
	}
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
	imports: [ConfigModule],

	useFactory: async (
		configService: ConfigService
	): Promise<TypeOrmModuleOptions> =>
		TypeOrmConfig.getOrmConfig(configService),

	inject: [ConfigService]
};
