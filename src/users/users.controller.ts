import {
	Body,
	Controller,
	HttpCode,
	Param,
	ParseUUIDPipe,
	Patch
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Patch(':id')
	@HttpCode(200)
	async findOneAndUpdate(
		@Body() UpdateUserDto: UpdateUserDto,
		@Param('id', ParseUUIDPipe) id: string
	) {
		return await this.usersService.update(id, UpdateUserDto);
	}
}
