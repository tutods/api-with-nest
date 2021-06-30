import { Controller, Get, Param } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
	@Get()
	findAll() {
		return {
			courses: []
		};
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return {
			course: id
		};
	}
}
