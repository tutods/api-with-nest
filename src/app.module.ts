import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { CoursesModule } from './courses/courses.module';

@Module({
	imports: [
		ConfigModule.forRoot(),

		// Configuration of TypeORM
		TypeOrmModule.forRootAsync(typeOrmConfigAsync),

		CoursesModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
