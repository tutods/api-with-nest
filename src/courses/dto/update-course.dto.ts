import { IsString } from 'class-validator';

export class UpdateCourseDto {
	@IsString()
	readonly name?: string;

	@IsString()
	readonly description?: string;

	@IsString({ each: true, message: 'Each tags needs to be a string' })
	readonly tags?: string[];
}
