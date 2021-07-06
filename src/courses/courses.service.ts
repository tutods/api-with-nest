import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
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
			throw new NotFoundException(`Course ${id} not found`);
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

		return {
			message: 'Course created successfully!',
			course
		};
	}

	async update(id: string, updateCourseDto: UpdateCourseDto) {
		const course = await this.repository.preload({
			id,
			...updateCourseDto
		});

		if (!course) {
			throw new NotFoundException(`Course with id ${id} not found!`);
		}

		try {
			await this.repository.save(course);
		} catch (error) {
			throw new HttpException(
				`Error updating course with id ${id}!`,
				HttpStatus.BAD_REQUEST
			);
		}

		return {
			message: `Course with id ${id} updated successfully!`,
			course
		};
	}

	async remove(id: string) {
		const course = await this.repository.findOne(id);

		if (!course) {
			throw new NotFoundException(`Course with id ${id} not exists!`);
		}

		try {
			await this.repository.remove(course);
		} catch (error) {
			throw new HttpException(
				`Occurred an error on deleting course with id ${id}!`,
				HttpStatus.BAD_REQUEST
			);
		}

		return {
			message: `Course with id ${id} deleted successfully!`,
			course
		};
	}
}
