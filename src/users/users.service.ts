import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { classToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private repository: Repository<User>,
		private configService: ConfigService
	) {}

	async create(createUserDto: CreateUserDto) {
		const userAlreadyExists = await this.repository.findOne({
			email: createUserDto.email
		});

		if (userAlreadyExists) {
			throw new HttpException(
				`User with email ${createUserDto.email} already exists`,
				HttpStatus.BAD_REQUEST
			);
		}

		const saltOrRounds = Number(this.configService.get('SALT'));

		createUserDto.password = await bcrypt.hash(
			createUserDto.password,
			saltOrRounds
		);

		const user = this.repository.create(createUserDto);

		try {
			await this.repository.save(user);
		} catch (error) {
			throw new HttpException(
				'Error saving a new user!',
				HttpStatus.BAD_REQUEST
			);
		}

		return {
			message: 'User created successfully!',
			user: classToClass(user)
		};
	}
}
