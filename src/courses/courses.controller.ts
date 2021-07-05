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
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
	constructor(private readonly coursesService: CoursesService) {}

	@Get()
	findAll() {
		return this.coursesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string, @Res() response) {
		const results = this.coursesService.findOne(id);

		if (!results) {
			return response.status(404).json({
				status: 404,
				message: `Course with id ${id} not found!`
			});
		}

		return response.status(200).json({
			course: results
		});
	}

	@Post()
	create(@Body() createCourseDto: CreateCourseDto, @Res() response) {
		const result = this.coursesService.create(createCourseDto);

		return response.status(201).json({
			message: 'Course added with success!',
			course: result
		});
	}

	@Patch(':id')
	findOneAndUpdate(
		@Body() updateCourseDto: UpdateCourseDto,
		@Param('id') id: string,
		@Res() response
	) {
		const result = this.coursesService.update(id, updateCourseDto);

		return response.status(200).json({
			message: `Course with id ${id} updated with success!`,
			course: result
		});
	}

	@Delete(':id')
	findOneAndDelete(@Param('id') id: string, @Res() response) {
		this.coursesService.remove(id);

		return response.status(200).json({
			message: `Course with id ${id} removed with success!`
		});
	}
}
