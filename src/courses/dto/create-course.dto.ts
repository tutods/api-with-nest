import { IsString } from 'class-validator';

export class CreateCourseDto {
	@IsString({ message: 'Name needs to be a string!' })
	readonly name: string;

	@IsString()
	readonly description: string;

	@IsString({ each: true, message: 'Each tags needs to be a string' })
	readonly tags: string[];
}
