import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
	@Get()
	findAll(@Res() response) {
		return response.status(200).send({
			courses: []
		});
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return {
			course: id
		};
	}

	@Post()
	create(@Body() body) {
		return {
			data: body
		};
	}
}
