import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	ParseUUIDPipe,
	Patch,
	Post
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
	constructor(private readonly coursesService: CoursesService) {}

	@Get()
	async findAll() {
		return await this.coursesService.findAll();
	}

	@Get(':id')
	@HttpCode(200)
	async findOne(@Param('id', ParseUUIDPipe) id: string) {
		return await this.coursesService.findOne(id);
	}

	@Post()
	@HttpCode(201)
	async create(@Body() createCourseDto: CreateCourseDto) {
		return await this.coursesService.create(createCourseDto);
	}

	@Patch(':id')
	@HttpCode(200)
	async findOneAndUpdate(
		@Body() updateCourseDto: UpdateCourseDto,
		@Param('id', ParseUUIDPipe) id: string
	) {
		return await this.coursesService.update(id, updateCourseDto);
	}

	@Delete(':id')
	@HttpCode(200)
	async findOneAndDelete(@Param('id', ParseUUIDPipe) id: string) {
		return await this.coursesService.remove(id);
	}
}
