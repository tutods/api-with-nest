import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller()
export class AuthController {
	constructor(private readonly usersService: UsersService) {}

	@Post('register')
	@HttpCode(201)
	async register(@Body() createUserDto: CreateUserDto) {
		return await this.usersService.create(createUserDto);
	}
}
