import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { CoursesModule } from './courses/courses.module';

@Module({
	imports: [
		// Load Config. Module
		ConfigModule.forRoot({ isGlobal: true }),

		// Configuration of TypeORM
		TypeOrmModule.forRootAsync(typeOrmConfigAsync),

		// Courses Module
		CoursesModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
