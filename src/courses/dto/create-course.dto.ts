import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
	@IsNotEmpty({ message: 'The course should have a name!' })
	@IsString({ message: 'Name needs to be a string!' })
	readonly name: string;

	@IsString({ message: 'The course description needs to be a string!' })
	readonly description: string;

	@IsString({ each: true, message: 'Each tag needs to be a string' })
	readonly tags: string[];
}
