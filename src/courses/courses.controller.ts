import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Res
} from '@nestjs/common';

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

	@Patch(':id')
	findOneAndUpdate(@Body() body, @Param('id') id: string) {
		return {
			id,
			data: body
		};
	}

	@Delete(':id')
	findOneAndDelete(@Param('id') id: string) {
		return {
			id,
			message: `${id} removed!`
		};
	}
}
