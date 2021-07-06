import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty({ message: 'The user should have a name!' })
	@IsString({ message: 'Name needs to be a string!' })
	readonly name: string;

	@IsEmail({}, { message: 'Email needs to be an valid email address!' })
	@IsNotEmpty({ message: 'The user should have a email!' })
	@IsString({ message: 'Email needs to be a string!' })
	readonly email: string;

	@IsNotEmpty({ message: 'The user should have a email!' })
	@IsString({ message: 'Password needs to be a string!' })
	password: string;
}
