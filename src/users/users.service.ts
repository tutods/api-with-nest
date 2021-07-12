import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private repository: Repository<User>
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

		const user = this.repository.create(createUserDto);

		console.log(user);

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

	async update(id: string, updateUserDto: UpdateUserDto) {
		const user = await this.repository.preload({ id, ...updateUserDto });

		if (!user) {
			throw new NotFoundException(`User with ID ${id} does not exist`);
		}

		try {
			await this.repository.save(user);
		} catch (error) {
			throw new HttpException(
				'Occurred an error updating user!',
				HttpStatus.BAD_REQUEST
			);
		}

		return {
			message: 'User updated successfully!',
			user
		};
	}
}
