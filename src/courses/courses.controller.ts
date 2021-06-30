import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
	@Get()
	findAll() {
		return {
			courses: []
		};
	}
}
