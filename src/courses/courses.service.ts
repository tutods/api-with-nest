import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
	constructor(
		@InjectRepository(Course)
		private repository: Repository<Course>
	) {}

	async findAll() {
		const results = await this.repository.find();

		return {
			numberOfCourses: results.length,
			courses: results
		};
	}

	async findOne(id: string) {
		const course = await this.repository.findOne(id);

		if (!course) {
			throw new HttpException(
				`Course ${id} not found`,
				HttpStatus.NOT_FOUND
			);
		}

		return course;
	}

	async create(createCourseDto: CreateCourseDto) {
		const course = this.repository.create(createCourseDto);

		try {
			await this.repository.save(course);
		} catch (error) {
			throw new HttpException(
				'Error creating a new course!',
				HttpStatus.BAD_REQUEST
			);
		}

		return course;
	}

	async update(id: string, updateCourseDto: any) {
		const course = await this.repository.findOne(id);

		if (!course) {
			throw new HttpException(
				`Course with id ${id} not found`,
				HttpStatus.NOT_FOUND
			);
		}

		try {
			await this.repository.update({ id }, updateCourseDto);
		} catch (error) {
			throw new HttpException(
				`Error updating course with id ${id}!`,
				HttpStatus.BAD_REQUEST
			);
		}

		return course;
	}

	async remove(id: string) {
		const course = await this.repository.findOne(id);

		if (!course) {
			throw new HttpException(
				`Course with id ${id} not exists!`,
				HttpStatus.NOT_FOUND
			);
		}

		await this.repository.remove(course);

		return HttpStatus.NO_CONTENT;
	}
}
