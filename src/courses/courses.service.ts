import { Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
	private courses: Course[] = [
		{
			id: '669194d',
			name: 'ReactJS: do básico ao expert',
			description: 'Aprenda React desde da base.',
			tags: ['react', 'typescript', 'vscode', 'front-end']
		}
	];

	findAll() {
		return {
			numberOfCourses: this.courses.length,
			courses: this.courses
		};
	}

	findOne(id: string) {
		return this.courses.find((course) => course.id === id);
	}

	create(createCourseDto: any) {
		this.courses.push(createCourseDto);
	}

	update(id: string, updateCourseDto: any) {
		const foundedCourse = this.courses.findIndex(
			(course) => course.id === id
		);

		this.courses[foundedCourse] = updateCourseDto;
	}

	remove(id: string) {
		const foundedCourse = this.courses.findIndex(
			(course) => course.id === id
		);

		if (foundedCourse === -1) {
			return;
		}

		this.courses.splice(foundedCourse);
	}
}
