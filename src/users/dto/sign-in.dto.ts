import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class SignInDto {
	@IsEmail({}, { message: 'Email needs to be an valid email address!' })
	@IsNotEmpty({ message: 'The user should have a email!' })
	@IsString({ message: 'Email needs to be a string!' })
	readonly email: string;

	@IsNotEmpty({ message: 'The user should have a email!' })
	@IsString({ message: 'Password needs to be a string!' })
	readonly password: string;
}
