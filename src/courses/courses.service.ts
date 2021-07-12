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
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {
	constructor(
		@InjectRepository(Course)
		private repository: Repository<Course>,

		@InjectRepository(Tag)
		private readonly tagRepository: Repository<Tag>
	) {}

	async findAll() {
		const results = await this.repository.find({ relations: ['tags'] });

		return {
			numberOfCourses: results.length,
			courses: results
		};
	}

	async findOne(id: string) {
		const course = await this.repository.findOne(id, {
			relations: ['tags']
		});

		if (!course) {
			throw new NotFoundException(`Course ${id} not found`);
		}

		return course;
	}

	async create(createCourseDto: CreateCourseDto) {
		const tags = await Promise.all(
			createCourseDto.tags.map((tag) => this.preloadTagByName(tag))
		);

		const course = this.repository.create({
			...createCourseDto,
			tags
		});

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
		const tags =
			updateCourseDto.tags &&
			(await Promise.all(
				updateCourseDto.tags.map((tag) => this.preloadTagByName(tag))
			));

		const course = await this.repository.preload({
			id,
			...updateCourseDto,
			tags
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

	private async preloadTagByName(name: string): Promise<Tag> {
		const tag = await this.tagRepository.findOne({ name });

		if (tag) {
			return tag;
		}

		return this.tagRepository.create({ name });
	}
}
